const {Sessions, Accounts} = require('../db/models');


module.exports = async () => {

    const testUser = await Accounts.insert({
        login: 'admin',
        password: 'admin',
        email: 'test@gmail.com',
        role: 'ADMIN',
        stripeId: '111',
        phoneNumber: '111',
        status: "ACTIVE",
    });

    const customerUser = await Accounts.insert({
        login: 'customer',
        password: 'customer',
        email: 'customer@cascom.com',
        role: 'CUSTOMER',
        stripeId: '111',
        phoneNumber: '111',
        status: "ACTIVE",
    });

    console.log(`user created`);

    const session = new Sessions({
        status: 'ACTIVE',
        token: TESTS_USER_TOKEN,
        account: testUser._id,
        creationDate: new Date().getTime(),

    });

    const sessionToClose = new Sessions({
        status: 'ACTIVE',
        token: TESTS_TOKEN_FOR_CLOSE_SESSION,
        account: testUser._id,
        creationDate: new Date().getTime(),

    });

    const customerSession = new Sessions({
        status: 'ACTIVE',
        token: TEST_CUSTOMER_TOKEN,
        account: customerUser._id,
        creationDate: new Date().getTime(),

    });

    await session.save();
    await sessionToClose.save();
    await customerSession.save();
    console.log(`user session created`);
};
