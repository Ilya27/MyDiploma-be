const colors = require('../helpers/colors');

module.exports = function (request, response, next) {
    let json = response.json;

    response.json = function (data, statusCode=null) {
        console.log(
            `Response: [${colors.font.Green}] %s %s`,
            request.method,
            request.originalUrl,
            request.headers["x-forwarded-for"] ||
            request.connection.remoteAddress
        );

        if(statusCode) {
            response.statusCode = statusCode;
        }

        response.setHeader("Api-Revision", request.API_REVISION);
        response.setHeader("Api-Version", request.API_VERSION);
        response.setHeader("X-Powered-By", request.author);

        json.apply(response, arguments);
    };

    next();
};
