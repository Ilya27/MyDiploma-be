const correctRegisterData = {
    login: "customer@customer.com",
    email: "customer@customer.com",
    password: "customer123",
    firstName: "CustomerFirstName",
    lastName: "CustomerLastName",

    address: {
        city: "Berlin",
        country: "Germany",
        postalCode: "10000",
        location: "100 AlexanderPlatz",
        state: "Bavaria",
    },
    card: {
        number: "4000007560000009",
        exp_month: 10,
        exp_year: 2050,
        cvc: "314",
    },
    additional: {
        companyName: "Company",
    },
};

const existingAccount = {
    login: "customer",
    email: "customer@customer.com", // duplicate email
    password: "customer123",
    firstName: "CustomerFirstName",
    lastName: "CustomerFirstName",

    address: {
        city: "Berlin",
        country: "Germany",
        postalCode: "10000",
        location: "100 AlexanderPlatz",
        state: "Bavaria",
    },
    card: {
        number: "4000007560000009",
        exp_month: 10,
        exp_year: 2050,
        cvc: "314"
    },
    additional: {
        companyName: "Company",
    },
};

const wrongCvcData = {
    login: "customer1",
    email: "customer1@customer.com",
    password: "customer123",
    firstName: "CustomerFirstName",
    lastName: "CustomerFirstName",

    address: {
        city: "Berlin",
        country: "Germany",
        postalCode: "10000",
        location: "100 AlexanderPlatz",
        state: "Bavaria",
    },
    card: {
        number: "4000007560000009",
        exp_month: 10,
        exp_year: 2050,
        cvc: "cvc" // invalid security code
    },
    additional: {
        companyName: "Company",
    },
};

const wrongExpiredData = {
    login: "customer2",
    email: "customer2@customer.com",
    password: "customer123",
    firstName: "CustomerFirstName",
    lastName: "CustomerFirstName",

    address: {
        city: "Berlin",
        country: "Germany",
        postalCode: "10000",
        location: "100 AlexanderPlatz",
        state: "Bavaria",
    },
    card: {
        number: "4000007560000009",
        exp_month: 10,
        exp_year: 1999, // wrong exp. year data
        cvc: "314"
    },
    additional: {
        companyName: "Company",
    },
};

const emptyRequiredField = {
    login: "customer3",
    email: "customer3@customer.com",
    password: "customer123",
    firstName: "", // empty 'firstName' field
    lastName: "CustomerFirstName",

    address: {
        city: "Berlin",
        country: "Germany",
        postalCode: "10000",
        location: "100 AlexanderPlatz",
        state: "Bavaria",
    },
    card: {
        number: "4000007560000009",
        exp_month: 10,
        exp_year: 2050,
        cvc: "314"
    },
    additional: {
        companyName: "Company",
    },
};

const accountTypesObject = {
    _id: joi.number(),
    role: joi.string(),
    status: joi.string(),
    stripeId: joi.string(),
    email: joi.string(),
    firstName: joi.string(),
    lastName: joi.string(),
    additional: joi.object(),
    password: joi.string(),
    login: joi.string(),
    salt: joi.string(),
    __v: joi.number(),
};

const errorObject = {
    message: joi.string(),
    stack: joi.string()
};

describe('Customer Registration', () => {

    context('POST', () => {

        frisby.create('Should create a new customer account')
            .config(frisbyConfig)
            .post('/auth/registration/customer', correctRegisterData)
            .expectStatus(201)
            .expectJSONTypes(accountTypesObject)
            .toss();

        frisby.create('Should not create a new account. Account is already existing')
            .config(frisbyConfig)
            .post('/auth/registration/customer', existingAccount)
            .expectStatus(409)
            .expectJSONTypes(errorObject)
            .toss();

        frisby.create('Should not create a new account. Cards security code is invalid')
            .config(frisbyConfig)
            .post('/auth/registration/customer', wrongCvcData)
            .expectStatus(400)
            .expectJSONTypes(errorObject)
            .toss();

        frisby.create('Should be the ValidationError. Cards exp.year must be equal or bigger than 2020')
            .config(frisbyConfig)
            .post('/auth/registration/customer', wrongExpiredData)
            .expectStatus(400)
            .expectJSONTypes(errorObject)
            .toss();

        frisby.create('Should be the ValidationError. First name is required')
            .config(frisbyConfig)
            .post('/auth/registration/customer', emptyRequiredField)
            .expectStatus(400)
            .expectJSONTypes(errorObject)
            .toss();
    });
});