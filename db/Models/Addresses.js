const ModelFactory = require('../../core/ModelFactory');

const MODEL_NAME = 'Addresses';


const structure = {

    accountId: {
        type: Number,
        require:true,
        ref: 'Accounts'
    },

    city: {
        type: String,
        require:true,
    },

    location: {
        type: String,
        require:true,
    },

};

const methods = {};
const staticMethods = {};


const modelInfo = ModelFactory({structure, modelName: MODEL_NAME, staticMethods, methods});
module.exports = modelInfo.model;