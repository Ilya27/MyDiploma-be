const userEmail = {
    "email": "test@gmail.com",
    "password": "admin",
};

const userLogin = {
    "login": "admin",
    "password": "admin",
};

const userWrongPasswordWithEmail = {
    "email": "test@gmail.com",
    "password": "WrongPassword",
};


const userWrongPasswordWithLogin = {
    "login": "admin",
    "password": "WrongPassword",
};

const userWrongEmail = {
    "email": "test1@gmail.com",
    "password": "admin",
};

const userWrongLogin = {
    "login": "WrongLogin",
    "password": "admin",
};

const userWithoutLoginOrEmail = {
    "password": "WrongPassword",
};

const userWithoutPasswordWithEmail= {
    "email": "test@gmail.com",
};

const userWithoutPasswordWithLogin= {
    "login": "admin",
};




const accountTypesObject = {
    _id: joi.number(),
    token: joi.string(),
    status: joi.string(),
    account: joi.object(),
    creationDate: joi.number(),
    __v: joi.number(),
};

const errorObject = {
    message: joi.string(),
    stack: joi.string(),
};

describe('Auth', () => {

    context('POST', () => {

        frisby.create('Should be get access token of user with Email')
            .config(frisbyConfig)
            .post('/auth/authorize', userEmail)
            .expectStatus(201)
            .expectJSONTypes(accountTypesObject)
            .toss();

        frisby.create('Should be get access token of user with Login')
            .config(frisbyConfig)
            .post('/auth/authorize', userLogin)
            .expectStatus(201)
            .expectJSONTypes(accountTypesObject)
            .toss();

        frisby.create('Should be Unauthorized (Email)')
            .config(frisbyConfig)
            .post('/auth/authorize', userWrongPasswordWithEmail)
            .expectStatus(401)
            .expectJSONTypes(errorObject)
            .afterJSON(error => {
                expect(error.message).to.equal('Unauthorized');
            })
            .toss();

        frisby.create('Should be Unauthorized (Login)')
            .config(frisbyConfig)
            .post('/auth/authorize', userWrongPasswordWithLogin)
            .expectStatus(401)
            .expectJSONTypes(errorObject)
            .afterJSON(error => {
                expect(error.message).to.equal('Unauthorized');
            })
            .toss();

        frisby.create('Should be ValidationError: "login" or "email" is required')
            .config(frisbyConfig)
            .post('/auth/authorize', userWithoutLoginOrEmail)
            .expectStatus(400)
            .expectJSONTypes(errorObject)
            .expectJSON('', {
                stack: 'ValidationError: "value" must contain at least one of [email, login]',
                message: '"value" must contain at least one of [email, login]',
            })
            .toss();


        frisby.create('Should be ValidationError: "password" is required')
            .config(frisbyConfig)
            .post('/auth/authorize', userWithoutPasswordWithEmail)
            .expectStatus(400)
            .expectJSONTypes(errorObject)
            .expectJSON('', {
                stack: 'ValidationError: "password" is required',
                message: '"password" is required'
            })
            .toss();

        frisby.create('Should be ValidationError: "password" is required')
            .config(frisbyConfig)
            .post('/auth/authorize', userWithoutPasswordWithLogin)
            .expectStatus(400)
            .expectJSONTypes(errorObject)
            .expectJSON('', {
                stack: 'ValidationError: "password" is required',
                message: '"password" is required'
            })
            .toss();


        frisby.create('Should be Unauthorized')
            .config(frisbyConfig)
            .post('/auth/authorize', userWrongLogin)
            .expectStatus(401)
            .expectJSONTypes(errorObject)
            .afterJSON(error => {
                expect(error.message).to.equal('Unauthorized');
            })
            .toss();

        frisby.create('Should be Unauthorized')
            .config(frisbyConfig)
            .post('/auth/authorize', userWrongEmail)
            .expectStatus(401)
            .expectJSONTypes(errorObject)
            .afterJSON(error => {
                expect(error.message).to.equal('Unauthorized');
            })
            .toss();
    });
});