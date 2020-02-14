const Joi = require('@hapi/joi');


module.exports = {
    default: Joi.object({
        type: Joi.string().required()
            .valid('providerGuest', 'memberGuestByFullSsn','memberGuestByOtherFields','memberWithPassword' ,'admin', 'provider')
    }),
    memberGuestByFullSsn: Joi.object({
        ssn: Joi.string().required().min(9),
        type: Joi.string().required().valid('memberGuestByFullSsn')

    }),
    memberGuestByOtherFields: Joi.object({
        ssn: Joi.string().required().min(4),
        birthday: Joi.string().required().required().empty(''),
        first_name: Joi.string().required().empty(''),
        last_name: Joi.string().required().empty(''),
        type: Joi.string().required().valid('memberGuestByOtherFields')
    }),
    providerGuest: Joi.object({
        npiNumber: Joi.string().required().empty('').min(4).max(10),
        taxId: Joi.string().required().empty('').min(4).max(10),
        type: Joi.string().required().valid('providerGuest')
    }),
    admin: Joi.object({
        login: Joi.string().required().empty(''),
        password: Joi.string().required().empty('').min(5),
        type: Joi.string().required().valid('admin')
    }),
    provider: Joi.object({
        login: Joi.string().required().empty(''),
        password: Joi.string().required().empty('').min(5),
        type: Joi.string().required().valid('provider')
    }),
    memberWithPassword:Joi.object({
        login: Joi.string().required().empty(''),
        password: Joi.string().required().empty('').min(5),
        type: Joi.string().required().valid('memberWithPassword')
    })
};
