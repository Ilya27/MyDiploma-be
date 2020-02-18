const userSupportNoEmail = {
    text: "message text",
};

const userSupportNoText = {
    email: "mail@example.com",
};

const userUnauthorizedSupport = {
    email: "mail@example.com",
    text: "message text",
};

const userUnauthorizedSupportWrongEmail = {
    email: "mail",
    text: "message text",
};

const userAuthorizedSupport = {
    text: "message text",
};


const errorObject = {
    message: joi.string(),
    stack: joi.string()
};


describe('Contact Us request', () => {

    context('POST', () => {

        frisby.create('email is required for support request')
            .config(frisbyConfig)
            .post('/contact-us', userSupportNoEmail)
            .expectStatus(400)
            // .expectJSONTypes(errorObject)
            // .expectJSON('', {
            //     message: '"email" is required',
            //     stack: 'ValidationError: "email" is required',
            // })
            .toss();

        frisby.create('text is required for support request')
            .config(frisbyConfig)
            .post('/contact-us', userSupportNoText)
            .expectStatus(400)
            // .expectJSONTypes(errorObject)
            // .expectJSON('', {
            //     message: '"text" is required',
            //     stack: 'ValidationError: "text" is required',
            // })
            .toss();

        frisby.create('support request for unauthorized user')
            .config(frisbyConfig)
            .post('/contact-us', userUnauthorizedSupport)
            .expectStatus(200)
            .toss();

        frisby.create('support request for authorized user')
            .config(frisbyConfig)
            .addHeader('Access-Token', TESTS_USER_TOKEN)
            .post('/contact-us', userAuthorizedSupport)
            .expectStatus(200)
            .toss();

        frisby.create("email isn't valid")
            .config(frisbyConfig)
            .post('/contact-us', userUnauthorizedSupportWrongEmail)
            .expectStatus(400)
            .toss();

    });
});
