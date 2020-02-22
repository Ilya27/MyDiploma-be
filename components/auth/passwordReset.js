const schema = require('./schemas/passwordResetSchema');
const Errors = require('../../core/Errors');
const {mongoPasswordReset, mongoProviders, mongoMembers} = require('../../db/models');
const checkToken = require('./helpers/checkResetToken');
const constants = require("../../core/helpers/const");


const actions = {
    provider: async (resetRequest) => {
        // get provider
        const provider = await mongoProviders.findOne({_id: resetRequest.account_id});

        if (!provider) {
            throw new Errors('', 404);
        }

        return provider;
    },

    member: async (resetRequest) => {
        // get member
        const member = await mongoMembers.findOne({_id: resetRequest.account_id});

        if (!member) {
            throw new Errors('', 404);
        }

        return member;
    },

    admin: async (request, response, next) => {
        throw new Errors('Sorry bro. Unsupported type now', 400);
    },
};


module.exports = async function (request, response, next) {
    try {
        let {token, password} = await schema.validateAsync(request.body, {allowUnknown: true});

        const resetRequest = await mongoPasswordReset.findOne({token});

        await checkToken(resetRequest);

        const model = await actions[resetRequest.type](resetRequest);

        model.password = model.createPasswordHash(password + model.salt);
        await model.save();

        await mongoPasswordReset.findOneAndUpdate(
            {token},
            {status: constants.statuses.PASSWORD_RESET_STATUS.CLOSED}
        );

        response.json({result: 'success'});
    } catch (e) {
        next(e)
    }
};
