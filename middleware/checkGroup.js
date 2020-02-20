const {generateAuthorizationError} = require('../core/Errors');


/**
 * usage:
 * router.get('/', checkGroup('Admins', 'Providers'), routeMiddleware);
 */
module.exports = (...roles) => function (request, response, next) {
    if (!roles.includes(request.session.account.role)) {
        return next(generateAuthorizationError(`Forbidden: allowed only for ${roles}`, 403));
    } else {
        next();
    }

};
