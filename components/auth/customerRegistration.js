const {Accounts, Addresses} = require("../../db/models");
const Errors = require("../../core/Errors");
const customerRegistrationSchema = require("./schemas/customerRegistrationSchema");


module.exports = async function (request, response, next) {
    try {

        let body = await customerRegistrationSchema.default.validateAsync(request.body, {
            allowUnknown: true
        });

        body = await customerRegistrationSchema[body.role].validateAsync(request.body);

        const session = await actions[body.role](body);

        await session.save();

        const result = await mongoSessions.populate(session, {
            path: "subject",
            select: "-__v -salt -password"
        });

        response.json(result, 201);
    } catch (e) {
        return next(e);
    }
    // try {
    //
    //     let body = await customerRegistrationSchema.validateAsync(request.body);
    //     const { email, card, address } = body;
    //     const role = 'CUSTOMER';
    //
    //     const existingAccount = await Accounts.findOne({role, email});
    //
    //     if (existingAccount) {
    //         throw new Errors('Account already exists', 409)
    //     }
    //
    //     const paymentMethod = await stripe.paymentMethods.create({type: 'card', card});
    //
    //     const customer = await stripe.customers.create({
    //         email,
    //         payment_method: paymentMethod.id,
    //         invoice_settings: {
    //             default_payment_method: paymentMethod.id,
    //         },
    //     });
    //
    //     const stripeId = customer.id;
    //
    //     const newCustomer = await Accounts.insert({
    //         role,
    //         stripeId,
    //         ...body
    //     })
    //
    //     const accountId = newCustomer._id;
    //
    //     await Addresses.insert({
    //         accountId,
    //         ...address
    //     })
    //
    //     response.json(newCustomer, 201)
    // } catch (e) {
    //     return next(e);
    // }
};
