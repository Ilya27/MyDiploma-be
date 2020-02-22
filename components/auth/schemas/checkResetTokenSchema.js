const Joi = require('@hapi/joi');

module.exports = Joi.object({
    token: Joi.string().required()
});
