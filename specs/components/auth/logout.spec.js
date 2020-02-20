
const logoutResponseTypes = {
    status: joi.string(),
    token: joi.string()
};

const logoutResponseJson= {
    status: 'CLOSED',
    token: 'token_for_close_session'
};

describe('Logout', () => {

    context('DELETE', () => {

        frisby.create('Should be return status 401')
            .config(frisbyConfig)
            .addHeader('Access-Token', TESTS_INVALID_TOKEN)
            .delete('/auth/logout')
            .expectStatus(401)
            .toss();

        frisby.create('Should be ends user session and marks the token as invalid')
            .config(frisbyConfig)
            .addHeader('Access-Token', TESTS_TOKEN_FOR_CLOSE_SESSION)
            .delete('/auth/logout')
            .expectStatus(200)
            .expectJSONTypes(logoutResponseTypes)
            .expectJSON(logoutResponseJson)
            .toss();
    });

});
