const ModelFactory = require('../../core/ModelFactory');
const {specialMethods} = require('../modelHelpers/');

const MODEL_NAME = 'Accounts';

const structure = {

    login: {
        type: String,
        unique: true,
        sparse: true,
    },

    email: {
        type: String,
        require: true,
    },

    stripeId: {
        type: String,
        require: true,
    },

    phoneNumber: {
        type: String,
        require: true,
    },

    password: {
        type: String,
    },

    salt: {
        type: String,
    },
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
