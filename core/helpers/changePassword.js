const Errors = require("../Errors");
const Joi = require('@hapi/joi');


changePasswordSchema = Joi.object({
    password: Joi.string().min(8).required(),
    oldPassword: Joi.string().min(8).required(),
});


module.exports = async function (subject, requestBody, model, forbiddenRegistrationStatuses) {
    const body = await changePasswordSchema.validateAsync(requestBody);

    if (forbiddenRegistrationStatuses.includes(subject.registrationStatus)) {
        throw new Errors("You have no rights to update your password, " +
            "because you don't have a registered account", 403);
    }

    const user = await model.findOne({_id: subject._id});

    if (!user.equalPassword(body.oldPassword)) {
        throw new Errors("Old password does not match", 400);
    }

    return await model.insert({_id: subject._id, password: body.password});
};
