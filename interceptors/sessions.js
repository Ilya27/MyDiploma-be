const Errors = require('../core/Errors');
const constants = require('../core/helpers/const');

module.exports = async function (request, response, next) {
    request.account = null;
    const ip = request.headers['x-forwarded-for'] ||
        request.connection.remoteAddress ||
        request.socket.remoteAddress ||
        request.connection.socket.remoteAddress;

    const token = request.headers['access-token'] || request.query['access-token'];

    try {
        if (token) {
            const {mongoSessions} = require("../db/models");
            let session = await mongoSessions.findOne({
                token,
                status: constants.statuses.SESSION_STATUS.ACTIVE
            }).populate('account');

            if (isSessionExpired(session, request.app_config.session.time)) {
                session = await closeSession(session, constants.statuses.SESSION_STATUS.EXPIRED);
            } else if (isUserStatusBlocked(session) || isWrongIpAddress(session, ip)) {
                session = await closeSession(session, constants.statuses.SESSION_STATUS.CLOSED);
            }

            // update session expiration time
            if (session && session.status === constants.statuses.SESSION_STATUS.ACTIVE) {
                session = await mongoSessions.findByIdAndUpdate(
                    session._id,
                    {creationDate: new Date().getTime()})
                    .populate('subject');
            }

            request.session = session;
        }

        next();

    } catch (e) {
        next(new Errors(e.message, 500))
    }
};

function isWrongIpAddress(session, ip) {
    return session && session.ipAddress !== ip;
}

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
