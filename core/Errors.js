class Errors extends Error {
    constructor(message, statusCode = 500) {
        super(message);
        this.statusCode = statusCode;

        return this;
    }
}

module.exports = Errors;

module.exports.generateAuthorizationError = function (message, statusCode = 401) {
    const e = new Error();
    e.statusCode = statusCode;
    e.name = 'AuthorizationError';
    e.message = message;
    return e;
};
