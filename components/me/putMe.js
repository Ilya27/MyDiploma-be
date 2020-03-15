const { Accounts } = require("../../db/models");
module.exports = async function(request, response, next) {
  try {
    const user = request.session.account;
    const updatedUser = await Accounts.insert({
      ...request.body,
      _id: user._id
    });
    response.json(updatedUser);
  } catch (e) {
    return next(e);
  }
};
