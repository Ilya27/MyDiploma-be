const Joi = require('@hapi/joi');


const files = Joi.array().items(Joi.object({
    _id: Joi.number().required().min(1),
    fileName: Joi.string().required().empty(''),
    size: Joi.number().required().empty(''),
    creationDate: Joi.number(),
    path: Joi.string().required().empty(''),
}));

module.exports.body = Joi.object({
    thumbnailUrl: Joi.string().required(),
    demoPdfUrl: Joi.string().required(),
    description: Joi.string(),
    files,
});

module.exports.params = Joi.object({
    id: Joi.number().min(1)
});
