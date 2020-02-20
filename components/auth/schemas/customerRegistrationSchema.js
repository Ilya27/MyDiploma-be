const Joi = require('@hapi/joi');


module.exports = Joi.object({
    login: Joi.string(),
    email: Joi.string().email({minDomainSegments: 2, tlds: {allow: true}}),
    password: Joi.string().required().empty(''),
    firstName: Joi.string().required().empty(''),
    lastName: Joi.string().required().empty(''),

    address: Joi.object({
        city: Joi.string().required().empty(''),
        country: Joi.string().required().empty(''),
        postalCode: Joi.string().required().empty(''),
        location: Joi.string().required().empty(''),
        state: Joi.string().required().empty(''),
    }),
    card: Joi.object({
        number: Joi.string().required().empty(''),
        exp_month: Joi.number().integer().required().min(1).max(12),
        exp_year: Joi.number().integer().required().min(2020).max(2100),
        cvc: Joi.string().required().empty(''),
    }),
    additional: Joi.object({
        companyName: Joi.string().required().empty(''),
    }),
});