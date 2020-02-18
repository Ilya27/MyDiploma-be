const ModelFactory = require('../../core/ModelFactory');


const MODEL_NAME = 'ProjectOptions';


const structure = {

    name: {
        type: String,
        require: true,
    },

    title: {
        type: String,
        require: true,
    },

    amount: {
        type: Number,
        require: true,
    },

    description: {
        type: String,
        require: true,
    },

    group: {
        type: String, // this value is automatically included in the project parameters if the value is "init"
    },
};

const methods = {};
const staticMethods = {};


const modelInfo = ModelFactory({structure, modelName: MODEL_NAME, staticMethods, methods});
module.exports = modelInfo.model;
