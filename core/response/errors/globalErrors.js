const {STATUS_CODES} = require("http");


module.exports = function (error, request, response, next) {
    if (error) {
        if (error.name === 'ValidationError' && error.isJoi) {
            error.statusCode = 400;
            error.message = error.details[0].message;
        }

        error.statusCode = error.statusCode ? error.statusCode : 500;
        error.message =
            error.message === ""
                ? STATUS_CODES[error.statusCode]
                : error.message;

        let errorResponse = {
            message: error.message
        };

        errorResponse["stack"] = error.stack;

        if (error.statusCode === 500) {
            console.error(error);
        }

        response.status(error.statusCode || 500).json(errorResponse);
    }
};
