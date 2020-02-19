const ModelFactory = require('../../core/ModelFactory');

const MODEL_NAME = 'Transactions';

const structure = {

    accountId: {
        type: Number,
        ref: 'Accounts'
    },

    projectId: {
        type: Number,
        ref: 'Projects'
    },

    description: {
        type: String
    },

    amount: {
        type: Number,
        require:true,
    },

    creationDate: {
        type: Number
    },

    files: {
        type: [Number],
        ref: 'Files',
    },

};

const methods = {};
const staticMethods = {};


const modelInfo = ModelFactory({structure, modelName: MODEL_NAME, staticMethods, methods});
module.exports = modelInfo.model;
