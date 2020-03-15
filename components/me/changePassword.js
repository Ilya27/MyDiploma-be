const { Accounts } = require("../../db/models");
const Joi = require("@hapi/joi");

changePasswordSchema = Joi.object({
  password: Joi.string()
    .min(8)
    .required(),
  oldPassword: Joi.string()
    .min(8)
    .required()
});

module.exports = async function(request, response, next) {
  console.log(request.session);

//   const user = request.session.account;
//   const body = await changePasswordSchema.validateAsync(request.body);
//   const account = await Account.findOne({ _id: user._id });

//   if (!account.equalPassword(body.oldPassword)) {
//     response.json("Old password does not match", 400);
//   }

//   const updatedUser = await Accounts.insert({
//     password: body.password,
//     _id: user._id
//   });

//   return updatedUser;
};
