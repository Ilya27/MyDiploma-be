const Errors = require("../../Errors");

module.exports = function (request, response, next) {
    next(new Errors('', 501));
};
