const ModelFactory = require('../../core/ModelFactory');

const MODEL_NAME = 'Files';

const structure = {

    fileName: {
        type: String,
    },

    size:{
        type: Number,
    },

    creationDate: {
        type: Number
    },

    path: {
        type: String
    },
};

const methods = {};
const staticMethods = {};


const modelInfo = ModelFactory({structure, modelName: MODEL_NAME, staticMethods, methods});
module.exports = modelInfo.model;
