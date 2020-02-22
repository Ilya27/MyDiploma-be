const Joi = require('@hapi/joi');


module.exports = Joi.object({
    projectId: Joi.number().required().min(1),
    thumbnailUrl: Joi.string().required(),
    demoPdfUrl: Joi.string().required(),
    description: Joi.string(),
});
