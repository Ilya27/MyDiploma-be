const Joi = require('@hapi/joi');


module.exports = Joi.object({
    limit: Joi.number().integer().min(5).max(100),
    page: Joi.number().integer().min(1),
    sort_by: Joi.string(),
    sort: Joi.string(),
    accountId: Joi.number(),
    projectId: Joi.number(),
    creationDate: Joi.number(),
});
