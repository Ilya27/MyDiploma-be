const {Schema} = require('mongoose');
const ModelFactory = require('../../core/ModelFactory');
const {specialMethods} = require('../modelHelpers/');

const MODEL_NAME = 'Projects';

const details = new Schema(
    {
        numOfFloors: {
            type: Number
        },

        numOfSquares: {
            type: Number
        },

        numOfRooms: {
            type: Number
        },

        numOfBathrooms: {
            type: Number
        },

        numOfGuestWCBat: {
            type: Number
        },

        numOfParkings: {
            type: Number
        },

        hasTerrace: {
            type: Boolean
        },

        hasWinterGarden: {
            type: Boolean
        },

        roofType: {
            type: String
        },

        skeletonType: {
            type: String
        },

        requirementsForArchitect: {
            type: String
        },

        additional: {
            type: String
        }
    },
    {_id: false}
);

const structure = {

    owner: {
        type: Number,
        ref: 'Accounts'
    },

    email: {
        type: String,
        require: true,
    },

    name: {
        type: String,
        require: true,
    },

    category: {
        type: String,
        require: true,
        enum: ['BUILDING', 'RENOVATION']
    },

    type: {
        type: String
    },

    style: {
        type: String
    },

    creationDate: {
        type: Number
    },

    startDate: {
        type: Number
    },

    endDate: {
        type: Number
    },

    status: {
        type: String,
        enum: ['BRIEFING', 'OPTIONS', 'TARIFF', 'ON_MODERATION', 'ACCEPTED', 'DECLINED']
    },

    paymentStatus: {
        type: String,
        enum: ['WAIT', 'PAID', 'CANCELED']
    },

    paymentAmount: {
        type: Number
    },

    tariffId: {
        type: Number,
        ref: 'Tariffs',
    },

    winnerIds: {
        type: [Number],
        ref: 'Accounts',
    },

    // TODO ask about rules of victory
    victoryRules: {
        type: String,
        // enum: ['BRIEFING', 'OPTIONS', 'TARIFF', 'ON_MODERATION', 'ACCEPTED', 'DECLINED']
    },

    projectOptions: {
        type: [Number],
        ref: 'ProjectOptions',
    },

    victoryRules: {
        type: String,
    },

    isPrizeFund: {
        type: Boolean,
    },

    isMoneyBack: {
        type: Boolean,
    },

    details
};

const methods = {};
const staticMethods = {};


const modelInfo = ModelFactory({structure, modelName: MODEL_NAME, staticMethods, methods});
module.exports = modelInfo.model;
