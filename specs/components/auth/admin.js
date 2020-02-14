const admin = {
    "login": "testAdmin",
    "password": "testAdmin",
    "type": "admin"
};

const adminWrongPassword = {
    "login": "testAdmin",
    "password": "testA",
    "type": "admin"
};

const adminNonExistedLogin = {
    "login": "testA",
    "password": "testAdmin",
    "type": "admin"
};

const adminWithoutLogin = {
    "password": "testAdmin",
    "type": "admin"
};

const adminWithoutPass = {
    "login": "testAdmin",
    "type": "admin"
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

describe('Auth Admin', () => {

    context('POST', () => {

        frisby.create('Should be get access token of admin')
            .config(frisbyConfig)
            .post('/auth/authorize', admin)
            .expectStatus(201)
            .expectJSONTypes(accountTypesObject)
            .toss();

        frisby.create('Should be Unauthorized')
            .config(frisbyConfig)
            .post('/auth/authorize', adminWrongPassword)
            .expectStatus(401)
            .expectJSONTypes(errorObject)
            .afterJSON(error => {
                expect(error.message).to.equal('Unauthorized');
            })
            .toss();

        frisby.create('Should be Unauthorized')
            .config(frisbyConfig)
            .post('/auth/authorize', adminNonExistedLogin)
            .expectStatus(401)
            .expectJSONTypes(errorObject)
            .afterJSON(error => {
                expect(error.message).to.equal('Unauthorized');
            })
            .toss();

        frisby.create('Should be ValidationError: "login" is required')
            .config(frisbyConfig)
            .post('/auth/authorize', adminWithoutLogin)
            .expectStatus(400)
            .expectJSONTypes(errorObject)
            .expectJSON('', {
                stack: 'ValidationError: "login" is required',
                message: '"login" is required'
            })
            .toss();

        frisby.create('Should be ValidationError: "password" is required')
            .config(frisbyConfig)
            .post('/auth/authorize', adminWithoutPass)
            .expectStatus(400)
            .expectJSONTypes(errorObject)
            .expectJSON('', {
                stack: 'ValidationError: "password" is required',
                message: '"password" is required'
            })
            .toss();
    });

});