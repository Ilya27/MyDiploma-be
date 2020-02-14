const guestProvider = {
    "npiNumber": "11111111",
    "taxId": "Test1",
    "type": "providerGuest"
};

const providerRegistered = {
    "login": "testProvider",
    "password": "testProvider",
    "type": "provider"
};

const providerWrongPassword = {
    "login": "testProvider",
    "password": "testProv",
    "type": "provider"
};

const providerNonExistedLogin = {
    "login": "testProv",
    "password": "testProvider",
    "type": "provider"
};

const providerWithoutTaxId = {
    "npiNumber": "Tet1",
    "type": "providerGuest"
};

const providerWithoutNPI = {
    "taxId": "Tet1",
    "type": "providerGuest"
};

const providerWithoutType = {
    "npiNumber": "11111111",
    "taxId": "Tet1",
};

const providerWithoutLogin = {
    "password": "testProvider",
    "type": "provider"
};

const providerWithoutPass = {
    "login": "testProvider",
    "type": "provider"
};

const accountTypesObject = {
    _id: joi.number(),
    group: joi.string(),
    token: joi.string(),
    status: joi.string(),
    subject: joi.object(),
    creationDate: joi.number(),
    __v: joi.number(),
    ipAddress: joi.string(),
};

const errorObject = {
    message: joi.string(),
    stack: joi.string()
};

describe('Auth Provider', () => {

    context('POST', () => {

        frisby.create('Should be get access token of provider guest')
            .config(frisbyConfig)
            .post('/auth/authorize', guestProvider)
            .expectStatus(201)
            .expectJSONTypes(accountTypesObject)
            .toss();

        frisby.create('Should be get access token of registered provider')
            .config(frisbyConfig)
            .post('/auth/authorize', providerRegistered)
            .expectStatus(201)
            .expectJSONTypes(accountTypesObject)
            .toss();

        frisby.create('Should be Unauthorized')
            .config(frisbyConfig)
            .post('/auth/authorize', providerWrongPassword)
            .expectStatus(401)
            .expectJSONTypes(errorObject)
            .afterJSON(error => {
                expect(error.message).to.equal('Unauthorized');
            })
            .toss();

        frisby.create('Should be Unauthorized')
            .config(frisbyConfig)
            .post('/auth/authorize', providerNonExistedLogin)
            .expectStatus(401)
            .expectJSONTypes(errorObject)
            .afterJSON(error => {
                expect(error.message).to.equal('Unauthorized');
            })
            .toss();

        frisby.create('Should be ValidationError "npiNumber" is required')
            .config(frisbyConfig)
            .post('/auth/authorize', providerWithoutNPI)
            .expectStatus(400)
            .expectJSONTypes(errorObject)
            .expectJSON('', {
                stack: 'ValidationError: "npiNumber" is required',
                message: '"npiNumber" is required'
            })
            .toss();

        frisby.create('Should be ValidationError: "taxId" is required')
            .config(frisbyConfig)
            .post('/auth/authorize', providerWithoutTaxId)
            .expectStatus(400)
            .expectJSONTypes(errorObject)
            .expectJSON('', {
                stack: 'ValidationError: "taxId" is required',
                message:'"taxId" is required'
            })
            .toss();

        frisby.create('Should be ValidationError: "taxId" is required')
            .config(frisbyConfig)
            .post('/auth/authorize', providerWithoutType)
            .expectStatus(400)
            .expectJSONTypes(errorObject)
            .expectJSON('', {
                stack: 'ValidationError: "type" is required',
                message: '"type" is required'
            })
            .toss();

        frisby.create('Should be ValidationError: "login" is required')
            .config(frisbyConfig)
            .post('/auth/authorize', providerWithoutLogin)
            .expectStatus(400)
            .expectJSONTypes(errorObject)
            .expectJSON('', {
                stack: 'ValidationError: "login" is required',
                message: '"login" is required'
            })
            .toss();

        frisby.create('Should be ValidationError: "password" is required')
            .config(frisbyConfig)
            .post('/auth/authorize', providerWithoutPass)
            .expectStatus(400)
            .expectJSONTypes(errorObject)
            .expectJSON('', {
                stack: 'ValidationError: "password" is required',
                message: '"password" is required'
            })
            .toss();
    });

});