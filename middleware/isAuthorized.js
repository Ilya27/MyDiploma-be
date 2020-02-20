const Errors = require('../core/Errors');
const {generateAuthorizationError} = Errors;
const constants = require('../core/helpers/const');
const config = require('../config');

module.exports = function (request, response, next) {
    const {EXPIRED, CLOSED, ACTIVE} = constants.statuses.SESSION_STATUS;
    if (request.session && request.session.status === EXPIRED) {
        return next(generateAuthorizationError(
            `Sorry, your session is expired! Current active time is ${Math.round(config.session.time / 1000 / 60)} min.`,
            401));
    } else if (request.session && request.session.status === CLOSED) {
        return next(generateAuthorizationError(
            `Sorry, your session is closed!`,
            401));
    } else if (request.session && request.session.status === ACTIVE) {
        next();
    } else {
        next(generateAuthorizationError('', 401));
    }
};
