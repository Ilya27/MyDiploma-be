const {mongoPasswordReset} = require('../../db/models');
const Errors = require('../../core/Errors');
const schema = require('./schemas/checkResetTokenSchema');
const checkToken = require('./helpers/checkResetToken');


module.exports = async function (request, response, next) {
    try {
        let {token} = await schema.validateAsync(request.query);

        const resetRequest = await mongoPasswordReset.findOne({token});

        await checkToken(resetRequest);

        response.json({status: resetRequest.status});
    } catch (e) {
        next(e)
    }
};
