const ModelFactory = require('../../core/ModelFactory');

const MODEL_NAME = 'Files';

const structure = {

    preview: {
        type: String,
    },

    source: {
        type: String,
    },

    size:{
        type: Number,
    },

    creationDate: {
        type: Number
    },

    url: {
        type: String
    },
};

const methods = {};
const staticMethods = {};


const modelInfo = ModelFactory({structure, modelName: MODEL_NAME, staticMethods, methods});
module.exports = modelInfo.model;
