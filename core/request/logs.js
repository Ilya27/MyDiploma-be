const colors = require('../helpers/colors');

module.exports = function (request, response, next) {

    console.log(`Request: [${colors.font.Blue}] %s %s`,
        request.method,
        request.originalUrl,
        request.headers['x-forwarded-for'] || request.connection.remoteAddress
    );

    next();
};
