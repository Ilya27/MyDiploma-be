const { Accounts } = require("../../db/models");
module.exports = async function(request, response, next) {
  try {
    const user = request.session.account;
    const ourUser = await Accounts.findById(user._id)
      .select("-password -salt -__v")
      .lean();
    response.json(ourUser);
  } catch (e) {
    return next(e);
  }
};
