const addSupportRequestSchema = require('./schemas/addSupportRequestSchema');
const mailer = require('../../core/mailer');


module.exports = async function (request, response, next) {
    try {
        console.log(request.session)
        const body = await addSupportRequestSchema(request.session).validateAsync(request.body);

        let supportRequest = {
            createdTime: new Date().getTime(),
            ...body
        };

        if (request.session && request.session.account) {
            const {text} = request.body;
            supportRequest = {
                ...supportRequest,
                account: request.session.account._id,
                email: request.session.account.email,
                text,
            }
        } else {
            const {text, email} = request.body;
            supportRequest = {
                ...supportRequest,
                account: 'unauthorized user',
                text, email,
            }
        }


        mailer.sendRequestToSupport(supportRequest)
            .catch(e => {
                    if (e.name === 'MailerSendError') {
                        console.error(`Unable to send email for provider request with id: ${supportRequest._id}`)
                    } else {
                        console.error(e);
                    }
                }
            );

        response.json({supportRequest});
    } catch (e) {
        return next(e);
    }
};