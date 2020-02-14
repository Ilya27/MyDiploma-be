const Mustache = require('mustache');
const fs = require('fs');
const path = require('path');
const schemas = require('./schemas/recoverySchema');
const Errors = require('../../core/Errors');
const {mongoPasswordReset, mongoProviders, mongoMembers} = require('../../db/models');
const Mailer = require('../../core/mailer/');
const constants = require("../../core/helpers/const");


const actions = {
    provider: async (request, response, next) => {
        const {email, type} = await schemas.provider.validateAsync(request.body);

        // get provider
        const provider = await mongoProviders.findOne({email: email});

        if (!provider) {
            throw new Errors('Email does not exist', 404);
        }

        // close previous request
        await mongoPasswordReset.findOneAndUpdate({
            account_id: provider._id,
            type,
            status: constants.statuses.PASSWORD_RESET_STATUS.ACTIVE
        }, {status: constants.statuses.PASSWORD_RESET_STATUS.CLOSED});

        // create reset request
        const {token} = await mongoPasswordReset.insert({account_id: provider._id, type});
        const {firstName = null, lastName = null} = provider;

        return {email, token, firstName, lastName};
    },

    member: async (request, response, next) => {
        const {email, type} = await schemas.member.validateAsync(request.body);

        // get member
        const member = await mongoMembers.findOne({email: email});

        if (!member) {
            throw new Errors('Email does not exist', 404);
        }

        // close previous request
        await mongoPasswordReset.findOneAndUpdate({
            account_id: member._id,
            type,
            status: constants.statuses.PASSWORD_RESET_STATUS.ACTIVE
        }, {status: constants.statuses.PASSWORD_RESET_STATUS.CLOSED});

        // create reset request
        const {token} = await mongoPasswordReset.insert({account_id: member._id, type});
        const {firstName, lastName} = member;

        return {email, token, firstName, lastName};
    },

    admin: async (request, response, next) => {
        throw new Errors('Sorry bro. Unsupported type now', 400);
    },
};


module.exports = async function (request, response, next) {
    try {
        let {type} = await schemas.default.validateAsync(request.body, {allowUnknown: true});

        let {email, token, firstName, lastName} = await actions[type](...arguments);

        // send email with login

        const {html_templates_folder} = request.app_config.mustache;

        const filePath = path.join(html_templates_folder, `resetPassword/${type}.html`);

        const htmlFile = fs.readFileSync(filePath);

        // generate link
        const html = Mustache.render(htmlFile.toString(), {
            url: [
                request.app_config.portals[type],
                `/password/reset?token=${token}`
            ].join(''),
            firstName,
            lastName
        });

        await Mailer.sendMail(email, 'Benebay Portals Password Reset', html);

        response.json({result: 'ok'});
    } catch (e) {
        next(e)
    }

};
