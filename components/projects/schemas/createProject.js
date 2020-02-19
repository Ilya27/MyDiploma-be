const Joi = require('@hapi/joi');


module.exports = Joi.object({
  email: Joi.string().email({minDomainSegments: 2, tlds: {allow: true}}).lowercase().required(),
  name: Joi.string().required(),
  category: Joi.string().valid('BUILDING', 'RENOVATION'),
  type: Joi.string(),
  style: Joi.string(),
  startDate: Joi.number().positive(),
  endDate: Joi.number().positive(),
  // TODO  ask about rules of victory
  victoryRules: Joi.string(),
  isPrizeFund: Joi.boolean(),
  isMoneyBack: Joi.boolean(),
  details: Joi.array().items(Joi.number())
});
