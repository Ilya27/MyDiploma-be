const Joi = require('@hapi/joi');

module.exports = Joi.object({
    token: Joi.string().required(),
    password: Joi.string().required(),
});
