const Joi = require('@hapi/joi');

const currentYear = new Date().getFullYear();

module.exports = {
    default: Joi.object({
        role: Joi.string().required()
            .valid('SITTER', 'FINDER')
    }),
    SITTER: Joi.object({
        firstName: Joi.string().required(),
        lastName: Joi.string().required(),
        role: Joi.string().required().valid('SITTER'),
        password: Joi.string().required().empty(''),
        email: Joi.string().email({minDomainSegments: 2, tlds: {allow: true}}).required(),
        address: Joi.object({
            city: Joi.string().required().empty(''),
            location: Joi.string().required().empty(''),
        }).required(),
        card: Joi.object({
            number: Joi.string().required().empty(''),
            exp_month: Joi.number().integer().required().min(1).max(12),
            exp_year: Joi.number().integer().required().min(currentYear).max(2100),
            cvc: Joi.number().required().empty(''),
        }).required(),
        additional: Joi.object({
            dogSize: Joi.array().required().empty(''),
            services: Joi.array().required().empty(''),
            salary: Joi.number().required().empty(''),
        }).required(),
    }),

    FINDER: Joi.object({
        firstName: Joi.string().required(),
        lastName: Joi.string().required(),
        role: Joi.string().required().valid('FINDER'),
        password: Joi.string().required().empty(''),
        email: Joi.string().email({minDomainSegments: 2, tlds: {allow: true}}).required(),
        address: Joi.object({
            city: Joi.string().required().empty(''),
            location: Joi.string().required().empty(''),
        }).required(),
        card: Joi.object({
            number: Joi.string().required().empty(''),
            exp_month: Joi.number().integer().required().min(1).max(12),
            exp_year: Joi.number().integer().required().min(currentYear).max(2100),
            cvc: Joi.number().required().empty(''),
        }).required(),
    }),
}