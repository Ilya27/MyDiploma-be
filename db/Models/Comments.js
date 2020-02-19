const ModelFactory = require('../../core/ModelFactory');

const MODEL_NAME = 'Files';

const structure = {

    accountId: {
        type: Number,
        ref: 'Accounts'
    },

    text: {
        type: String
    },

    creationDate: {
        type: Number
    },

    projectId:{
        type: Number,
        ref: 'Project'
    },

    offerId:{
        type: Number,
        ref: 'Offers'
    },
};

const methods = {};
const staticMethods = {};


const modelInfo = ModelFactory({structure, modelName: MODEL_NAME, staticMethods, methods});
module.exports = modelInfo.model;
