const ModelFactory = require('../../core/ModelFactory');
const {Schema} = require('mongoose');

const MODEL_NAME = 'Tariffs';

const additional = new Schema(
    {
        name: {
            type: String
        },

        value: {
            type: String
        },

        description: {
            type: String
        },
    },
    {_id: false}
);

const structure = {
    additional,

    name: {
        type: String,
    },

    amount: {
        type: Number
    },

    numOfOffers: {
        type: Number,
        default: null, // null === unlimit
    },

    advantages: {
        type: String
    },
};

const methods = {};
const staticMethods = {};


const modelInfo = ModelFactory({structure, modelName: MODEL_NAME, staticMethods, methods});
module.exports = modelInfo.model;
