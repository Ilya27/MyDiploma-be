const Errors = require('../../../core/Errors');
const constants = require('../../../core/helpers/const');

module.exports = async function (resetRequest) {

    if (!resetRequest) {
        throw new Errors('Request not exist', 404);
    }

    const time = new Date().getTime() - 172800 * 1000;

    if (resetRequest.status === constants.statuses.PASSWORD_RESET_STATUS.EXPIRED) {
        throw new Errors('link time has expired', 400);
    }

    if (resetRequest.creationDate < time) {
        resetRequest.status = constants.statuses.PASSWORD_RESET_STATUS.EXPIRED;
        await resetRequest.save();
        throw new Errors('link time has expired', 400);
    }

    if (resetRequest.status === constants.statuses.PASSWORD_RESET_STATUS.CLOSED) {
        throw new Errors('link already used', 400);
    }

};
