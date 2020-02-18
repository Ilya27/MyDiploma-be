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
        unique: true,
        sparse: true,
    },

    role: {
        type: String,
        require: true,
        enum:['ADMIN','COMPANY','CUSTOMER']
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
        require: true,
    },

    salt: {
        type: String,
    },

    status: {
        type: String,
        enum: ['active', 'blocked', 'deleted'],
        default: 'active'
    }

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
