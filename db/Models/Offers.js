const ModelFactory = require('../../core/ModelFactory');

const MODEL_NAME = 'Offers';

const structure = {

    accountId: {
        type: Number,
        ref: 'Accounts'
    },

    thumbnailUrl: {
        type: String,
        require: true,
    },

    demoPdfUrl: {
        type: String,
        require: true,
    },

    creationDate: {
        type: Number
    },

    files: {
        type: [Number],
        ref: 'Files',
    },

    description: {
        type: String
    }

};

const methods = {};
const staticMethods = {};


const modelInfo = ModelFactory({structure, modelName: MODEL_NAME, staticMethods, methods});
module.exports = modelInfo.model;
