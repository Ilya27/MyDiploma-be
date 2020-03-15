const { Accounts } = require("../../db/models");
const Errors = require("../../core/Errors");
const authorizeSchema = require("./schemas/authorizeSchemas");

module.exports = async function(request, response, next) {
  try {
    const account = await Accounts.findOne({ email: request.params.email });
    if (account) response.json("Email already exists", 409);
    else   response.json("Email doesn't exist", 200);
  } catch (e) {
    return next(e);
  }
};
