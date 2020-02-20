const Joi = require("@hapi/joi");

module.exports = (isSession) => {

    return Joi.object({
        email: isSession ? Joi.string().email() : Joi.string().email().required(),
        text: Joi.string().empty('').required(),
    })
};
