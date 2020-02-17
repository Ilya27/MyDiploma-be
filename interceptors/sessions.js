const Errors = require('../core/Errors');
const constants = require('../core/helpers/const');

module.exports = async function (request, response, next) {
    request.account = null;
    const token = request.headers['access-token'] || request.query['access-token'];

    try {
        if (token) {
            const {Sessions} = require("../db/models");
            let session = await Sessions.findOne({
                token,
                status: constants.statuses.SESSION_STATUS.ACTIVE
            }).populate('account');

            if (isSessionExpired(session, request.app_config.session.time)) {
                session = await closeSession(session, constants.statuses.SESSION_STATUS.EXPIRED);
            } else if (isUserStatusBlocked(session)) {
                session = await closeSession(session, constants.statuses.SESSION_STATUS.CLOSED);
            }

            // update session expiration time
            if (session && session.status === constants.statuses.SESSION_STATUS.ACTIVE) {
                session = await Sessions.findByIdAndUpdate(
                    session._id,
                    {creationDate: new Date().getTime()})
                    .populate('account');
            }

            request.session = session;
        }

        next();

    } catch (e) {
        next(new Errors(e.message, 500))
    }
};

function isSessionExpired(session, sessionExpirationTime) {
    return session && session.creationDate < new Date().getTime() - sessionExpirationTime
}

function isUserStatusBlocked(session) {
    return session && session.subject.registrationStatus === constants.statuses.PROVIDER_REGISTRATION_STATUS.BLOCKED
}

async function closeSession(session, closedStatus = constants.statuses.SESSION_STATUS.CLOSED) {
    session.status = closedStatus;
    await session.save();
    return {...session.toObject(), subject: null};
}
