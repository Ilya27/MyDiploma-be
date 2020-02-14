const {generateAuthorizationError} = require('../core/Errors');


/**
 * usage:
 * router.get('/', checkGroup('Admins', 'Providers'), routeMiddleware);
 */
module.exports = (...groups) => function (request, response, next) {
    if (!groups.includes(request.session.group)) {
        return next(generateAuthorizationError(`Forbidden: allowed only for ${groups}`, 403));
    } else {
        next();
    }
};
