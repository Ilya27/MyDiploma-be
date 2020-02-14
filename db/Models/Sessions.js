const crypto = require('crypto');
const ModelFactory = require('../../core/ModelFactory');
const constants = require('../../core/helpers/const');
const MODEL_NAME = 'Sessions';

const structure = {
    token: String,

    status: {
        type: String,
        enum: [
            constants.statuses.SESSION_STATUS.ACTIVE,
            constants.statuses.SESSION_STATUS.CLOSED,
            constants.statuses.SESSION_STATUS.EXPIRED,
        ],
        default: constants.statuses.SESSION_STATUS.ACTIVE
    },

    creationDate: {
        type: Number
    },

    account: {
        type: Number,
        ref: 'Accounts'
    },

};

const staticMethods = {};
const methods = {};


staticMethods.insert = function ({subject = null, group}) {
    let Model = this;

    let token = this.generateToken(subject._id);

    let data = {
        token,
        status: constants.statuses.SESSION_STATUS.ACTIVE,
        subject: subject._id,
        group,
        creationDate: new Date().getTime(),
    };

    let instance = new Model(data);

    return instance.save();
};

staticMethods.generateToken = function (userId) {
    return crypto.createHash('md5').update(`${userId}:${new Date().getTime()}`).digest("hex");
}

staticMethods.byToken = function ({token, status = constants.statuses.SESSION_STATUS.ACTIVE}) {
    return this.findOne({token, status});
};

const modelInfo = ModelFactory({structure, modelName: MODEL_NAME, staticMethods, methods});
module.exports = modelInfo.model;
