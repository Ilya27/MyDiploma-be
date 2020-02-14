const guestMember = {
    "ssn": "595732223",
    "birthday": "1980-12-04",
    "first_name": "Keval",
    "last_name": "Patel",
    "type": "memberGuestByOtherFields",
};

const memberRegistered = {
    "login": "testMember",
    "password": "testMember",
    "type": "memberWithPassword"
};

const memberWrongPassword = {
    "login": "testMember",
    "password": "testMem",
    "type": "memberWithPassword"
};

const memberNonExistedLogin = {
    "login": "testMem",
    "password": "testMember",
    "type": "memberWithPassword"
};

const guestMemberWithoutSSN = {
    "birthday": "1980-12-04",
    "first_name": "Keval",
    "last_name": "Patel",
    "type": "memberGuestByOtherFields",
};

const guestMemberWithoutBirthday = {
    "ssn": "595732223",
    "first_name": "Keval",
    "last_name": "Patel",
    "type": "memberGuestByOtherFields",
};

const guestMemberWithoutFName = {
    "ssn": "595732223",
    "birthday": "1980-12-04",
    "last_name": "Patel",
    "type": "memberGuestByOtherFields",
};

const guestMemberWithoutLName = {
    "ssn": "595732223",
    "birthday": "1980-12-04",
    "first_name": "Keval",
    "type": "memberGuestByOtherFields",
};

const guestMemberWithoutType = {
    "ssn": "595732223",
    "birthday": "1980-12-04",
    "first_name": "Keval",
    "last_name": "Patel",
};

const memberWithoutLogin = {
    "password": "testMember",
    "type": "memberWithPassword"
};

const memberWithoutPass = {
    "login": "testMember",
    "type": "memberWithPassword"
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

describe('Auth Member', () => {

    context('POST', () => {

        frisby.create('Should be get access token of member guest')
            .config(frisbyConfig)
            .post('/auth/authorize', guestMember)
            .expectStatus(201)
            .expectJSONTypes(accountTypesObject)
            .toss();

        frisby.create('Should be get access token of registered member')
            .config(frisbyConfig)
            .post('/auth/authorize', memberRegistered)
            .expectStatus(201)
            .expectJSONTypes(accountTypesObject)
            .toss();

        frisby.create('Should be Unauthorized')
            .config(frisbyConfig)
            .post('/auth/authorize', memberWrongPassword)
            .expectStatus(401)
            .expectJSONTypes(errorObject)
            .afterJSON(error => {
                expect(error.message).to.equal('Unauthorized');
            })
            .toss();

        frisby.create('Should be Unauthorized')
            .config(frisbyConfig)
            .post('/auth/authorize', memberNonExistedLogin)
            .expectStatus(401)
            .expectJSONTypes(errorObject)
            .afterJSON(error => {
                expect(error.message).to.equal('Unauthorized');
            })
            .toss();

        frisby.create('Should be ValidationError "ssn" is required')
            .config(frisbyConfig)
            .post('/auth/authorize', guestMemberWithoutSSN)
            .expectStatus(400)
            .expectJSONTypes(errorObject)
            .expectJSON('', {
                stack: 'ValidationError: "ssn" is required',
                message: '"ssn" is required'
            })
            .toss();

        frisby.create('Should be ValidationError: "birthday" is required')
            .config(frisbyConfig)
            .post('/auth/authorize', guestMemberWithoutBirthday)
            .expectStatus(400)
            .expectJSONTypes(errorObject)
            .expectJSON('', {
                stack: 'ValidationError: "birthday" is required',
                message: '"birthday" is required'
            })
            .toss();

        frisby.create('Should be ValidationError: "first_name" is required')
            .config(frisbyConfig)
            .post('/auth/authorize', guestMemberWithoutFName)
            .expectStatus(400)
            .expectJSONTypes(errorObject)
            .expectJSON('', {
                stack: 'ValidationError: "first_name" is required',
                message: '"first_name" is required'
            })
            .toss();

        frisby.create('Should be ValidationError: "last_name" is required')
            .config(frisbyConfig)
            .post('/auth/authorize', guestMemberWithoutLName)
            .expectStatus(400)
            .expectJSONTypes(errorObject)
            .expectJSON('', {
                stack: 'ValidationError: "last_name" is required',
                message: '"last_name" is required'
            })
            .toss();

        frisby.create('Should be ValidationError: "type" is required')
            .config(frisbyConfig)
            .post('/auth/authorize', guestMemberWithoutType)
            .expectStatus(400)
            .expectJSONTypes(errorObject)
            .expectJSON('', {
                stack: 'ValidationError: "type" is required',
                message: '"type" is required'
            })
            .toss();

        frisby.create('Should be ValidationError: "login" is required')
            .config(frisbyConfig)
            .post('/auth/authorize', memberWithoutLogin)
            .expectStatus(400)
            .expectJSONTypes(errorObject)
            .expectJSON('', {
                stack: 'ValidationError: "login" is required',
                message: '"login" is required'
            })
            .toss();

        frisby.create('Should be ValidationError: "password" is required')
            .config(frisbyConfig)
            .post('/auth/authorize', memberWithoutPass)
            .expectStatus(400)
            .expectJSONTypes(errorObject)
            .expectJSON('', {
                stack: 'ValidationError: "password" is required',
                message: '"password" is required'
            })
            .toss();
    });

});