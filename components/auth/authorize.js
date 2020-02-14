const {
    mongoProviders,
    mongoMembers,
    Provider,
    Member,
    mongoSessions,
    mongoAdmins,
} = require("../../db/models");
const Errors = require("../../core/Errors");
const schemas = require("./schemas/authorizeSchemas");
const constants = require("../../core/helpers/const");

const actions = {
    providerGuest: async body => {
        const group = constants.roles.GROUPS.PROVIDERS;

        let provider = await Provider.findOne({
            where: {
                code: body.taxId,
                npi_number: body.npiNumber
            }
        });

        // data depending on the presence in the external TPA base
        const externalId = provider ? provider.id : -1;
        const npi = provider ? provider.npi_number : body.taxId;
        const taxId = provider ? provider.code : body.npiNumber;

        let subject = await mongoProviders.findOne({
            externalId,
            registrationStatus:
            constants.statuses.PROVIDER_REGISTRATION_STATUS.UNREGISTERED,
            npi,
            taxId,
        });

        if (!subject) {
            subject = await mongoProviders.insert({
                externalId,
                registrationStatus:
                constants.statuses.PROVIDER_REGISTRATION_STATUS.UNREGISTERED,
                npi,
                taxId,
            });
        }

        return mongoSessions.insert({subject, group});
    },

    //TODO: create a refactor
    memberGuestByOtherFields: async body => {
        const member = await actions.member(body);
        return member;
    },

    memberGuestByFullSsn: async body => {

        // PORT-139 this feature is removed
        throw new Errors(`Use 'memberGuestByOtherFields'`, 405);

        const member = await actions.member(body);
        return member;
    },

    member: async (body) => {
        const group = constants.roles.GROUPS.MEMBERS;

        // body['birthday18Plus'] = true;

        let member = await Member.search({
            query: body,
            pagination: {limit: 1, offset: 0}
        });


        // return member;
        if (member && member.length) {
            member = member[0];
        } else {
            throw new Errors('', 404)
        }

        if (member.age < 18) {
            throw new Errors(`You're too young`, 403)
        }

        let subject = await mongoMembers.findOne({
            externalId: member.id,
            //   registrationStatus:
            //     constants.statuses.MEMBER_REGISTRATION_STATUS.UNREGISTERED,
            firstName: member.first_name,
            lastName: member.last_name
        });

        if (!subject) {
            subject = await mongoMembers.insert({
                externalId: member.id,
                registrationStatus:
                constants.statuses.MEMBER_REGISTRATION_STATUS.UNREGISTERED,
                firstName: member.first_name,
                lastName: member.last_name,
                birthday: member.birthday
            });
        }

        return mongoSessions.insert({subject, group});
    },
    memberWithPassword: async (body) => {
        const group = constants.roles.GROUPS.MEMBERS;

        let member = await mongoMembers.findOne({
            login: body.login,
        });
        if (!(member && member.equalPassword(body.password))) {
            throw new Errors("", 401);
        }

        return mongoSessions.insert({subject: member, group});
    },

    admin: async body => {
        const group = constants.roles.GROUPS.ADMINS;

        let admin = await mongoAdmins.findOne({
            login: body.login
        });

        if (!(admin && admin.equalPassword(body.password))) {
            throw new Errors("", 401);
        }

        return mongoSessions.insert({subject: admin, group});
    },

    provider: async body => {
        const group = constants.roles.GROUPS.PROVIDERS;

        let provider = await mongoProviders.findOne({
            login: body.login,
        });

        if (!(provider && provider.equalPassword(body.password))) {
            throw new Errors("", 401);
        }

        if (provider.registrationStatus === constants.statuses.PROVIDER_REGISTRATION_STATUS.BLOCKED) {

            throw new Errors('Sorry, you are blocked by admin.',
                // message temporary removed
                403);
        }

        return mongoSessions.insert({subject: provider, group});
    }
};

module.exports = async function (request, response, next) {
    try {
        const ip = request.headers['x-forwarded-for'] ||
            request.connection.remoteAddress ||
            request.socket.remoteAddress ||
            request.connection.socket.remoteAddress;

        let body = await schemas.default.validateAsync(request.body, {
            allowUnknown: true
        });
        body = await schemas[body.type].validateAsync(request.body);

        const session = await actions[body.type](body);
        session.ipAddress = ip;
        await session.save();

        const result = await mongoSessions.populate(session, {
            path: "subject",
            select: "-__v -salt -password"
        });

        response.json(result, 201);
    } catch (e) {
        return next(e);
    }
};
