const ModelFactory = require('../../core/ModelFactory');

const MODEL_NAME = 'OfferRatings';

const structure = {

    offerId: {
        type: Number,
        ref: 'Offers'
    },

    accountId: {
        type: Number,
        ref: 'Accounts'
    },

    rating:{
        type: Number,
        min:1,
        max:5,
    },

};

const methods = {};
const staticMethods = {};


const modelInfo = ModelFactory({structure, modelName: MODEL_NAME, staticMethods, methods});
module.exports = modelInfo.model;
