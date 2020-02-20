const {Sessions, Accounts} = require("../../db/models");
const Errors = require("../../core/Errors");
const authorizeSchema = require("./schemas/authorizeSchemas");


module.exports = async function (request, response, next) {
    try {

        let body = await authorizeSchema.validateAsync(request.body);
        const {password, ...other} = body;
        const account = await Accounts.findOne(other);

        if (!account) {
            throw new Errors('', 401)
        }

        if (!account.equalPassword(body.password)) {
            throw new Errors('', 401)
        }

        const session = await Sessions.insert({account});
        await session.save();

        const result = await Sessions.populate(session, {
            path: "account",
            select: "-__v -salt -password"
        });

        response.json(result, 201);
    } catch (e) {
        return next(e);
    }
};
