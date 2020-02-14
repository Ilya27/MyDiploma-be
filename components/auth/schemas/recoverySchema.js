const Joi = require('@hapi/joi');


module.exports = {
    default: Joi.object({
        type: Joi.string().required().valid('provider', 'member', 'admin')
    }),

    member: Joi.object({
        email: Joi.string().required(),
        type: Joi.string().valid('member')
    }),

    provider: Joi.object({
        email: Joi.string().required(),
        type: Joi.string().required().valid('provider')
    }),

    admin: Joi.object({
        email: Joi.string().required(),
        type: Joi.string().required().valid('admin')
    }),
};
