const Joi = require('@hapi/joi');


module.exports = Joi.object({
    email: Joi.string().email({minDomainSegments: 2, tlds: {allow: true}}),
    password: Joi.string().required().empty(''),
    login: Joi.string(),
}).xor('email', 'login');
