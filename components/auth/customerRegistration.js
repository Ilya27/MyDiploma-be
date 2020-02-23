const {Accounts, Addresses} = require("../../db/models");
const Errors = require("../../core/Errors");
const customerRegistrationSchema = require("./schemas/customerRegistrationSchema");


module.exports = async function (request, response, next) {
    try {
        console.log(request.body)
        let body = await customerRegistrationSchema.default.validateAsync(request.body, {
            allowUnknown: true
        });
        body = await customerRegistrationSchema[body.role].validateAsync(request.body);
        const {role, email, address} = body;
        const existingAccount = await Accounts.findOne({role, email});
        if (existingAccount) {
            throw new Errors('Account already exists', 409)
        }

        const newCustomer = await Accounts.insert({
            ...body
        })

        const accountId = newCustomer._id;

        await Addresses.insert({
            accountId,
            ...address
        })

        response.json(newCustomer, 201)
    } catch (e) {
        return next(e);
    }
};
