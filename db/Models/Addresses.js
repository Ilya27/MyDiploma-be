const ModelFactory = require('../../core/ModelFactory');

const MODEL_NAME = 'Addresses';


const structure = {

    accountId: {
        type: Number,
        ref: 'Accounts'
    },

    city: {
        type: String,
    },

    country: {
        type: String,
    },

    postalCode: {
        type: String,
    },

    location: {
        type: String,
    },

    state: {
        type: String,
    },
};

const methods = {};
const staticMethods = {};


const modelInfo = ModelFactory({structure, modelName: MODEL_NAME, staticMethods, methods});
module.exports = modelInfo.model;