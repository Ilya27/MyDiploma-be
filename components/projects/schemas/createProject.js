const Joi = require('@hapi/joi');
const {projectFields} = require('../../../core/helpers/const/');


module.exports = Joi.object({
  email: Joi.string().email({minDomainSegments: 2, tlds: {allow: true}}).lowercase().required(),
  name: Joi.string().required(),
  category: Joi.string().valid(projectFields.CATEGORIES.BUILDING, projectFields.CATEGORIES.RENOVATION),
  type: Joi.string(),
  style: Joi.string(),
  startDate: Joi.number().positive(),
  endDate: Joi.number().positive(),
  // TODO  ask about rules of victory
  victoryRules: Joi.string(),
  isPrizeFund: Joi.boolean(),
  isMoneyBack: Joi.boolean(),
  details: Joi.object({
    numOfFloors: Joi.number().positive(),
    numOfSquares: Joi.number().positive(),
    numOfRooms: Joi.number().positive(),
    numOfBathrooms: Joi.number().positive(),
    numOfGuestWCBat: Joi.number().positive(),
    numOfParkings: Joi.number().positive(),
    hasTerrace: Joi.boolean(),
    hasWinterGarden: Joi.boolean(),
    roofType: Joi.string(),
    skeletonType: Joi.string(),
    requirementsForArchitect: Joi.string(),
    additional: Joi.string(),
  }),
  projectOptions: Joi.array().items(Joi.number()),
});
