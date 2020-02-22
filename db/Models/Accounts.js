const {Schema} = require('mongoose');
const ModelFactory = require('../../core/ModelFactory');
const constants = require('../../core/helpers/const');
const {specialMethods} = require('../modelHelpers/');

const MODEL_NAME = 'Accounts';

const additional = new Schema(
    {
        services: {
            type: [Number],
            //ref Services
        },

        dogSize: {
            type: [Number],
            //ref Services DogSizes
        }
    },
    {_id: false}
);

const structure = {
    firstName: {
        type: String,
        require: true,
    },

    lastName: {
        type: String,
        require: true,
    },

    login: {
        type: String,
        unique: true,
        sparse: true,
        require: true,
    },

    email: {
        type: String,
        require: true,
        unique: true,
        sparse: true,
    },

    role: {
        type: String,
        require: true,
        enum: [
            constants.roles.GROUPS.ADMIN,
            constants.roles.GROUPS.SITTER,
            constants.roles.GROUPS.FINDER
        ]
    },

    avatarUrl: {
        type: String
    },

    phoneNumber: {
        type: String,
        require: true,
    },

    password: {
        type: String,
        require: true,
    },

    salt: {
        type: String,
    },

    status: {
        type: String,
        enum: [
            constants.accountStatuses.ACTIVE,
            constants.accountStatuses.BLOCKED
        ],
        default: constants.accountStatuses.ACTIVE
    },

    additional

};

const methods = {
    ...{equalPassword, createPasswordHash} = specialMethods
    /*  equalPassword: specialMethods.equalPassword,
      createPasswordHash: specialMethods.createPasswordHash*/
};

const staticMethods = {...specialMethods};
delete staticMethods.insertWithPassword;
delete staticMethods.equalPassword;

// overwrite insert method
staticMethods.insert = specialMethods.insertWithPassword;

const modelInfo = ModelFactory({structure, modelName: MODEL_NAME, staticMethods, methods});
module.exports = modelInfo.model;
