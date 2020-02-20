const envs = require('../envs');
const {spawn} = require('child_process');
const {
    roles,
    statuses,
} = require('../core/helpers/const');

let server;

before(async function (done) {
    //Correct database drop

    if (process.env.NODE_ENV !== 'test') {
        throw new Error('Please use test environment NODE_ENV=test example "export NODE_ENV=test"')
    }

    let connection = await require("./../db/mongo.js");

    console.log('Drop TEST database');
    await connection.connection.db.dropDatabase();

    const {Sessions, Accounts} = require('../db/models');

    const testUser = await Accounts.insert({
        login: 'admin',
        password: 'admin',
        email: 'test@gmail.com',
        role: 'ADMIN',
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

    await session.save();
    await sessionToClose.save();
    console.log(`user session created`);


    await connection.disconnect();

    console.log(`try start server`);

    server = spawn('node', ['index.js']);
    server.stdout.on('data', (data) => {
        data = data.toString();
        console.log(data);
        if (data.indexOf('Server is started at ') !== -1) {
            done();
        }
    });

    server.stderr.on('data', (data) => {
        data = data.toString();
        console.log(`server error log: `, data);
       //throw new Error(data)
    });

});

after(async function (done) {
    console.log(`after`);
    server.stdin.pause();
    server.kill();
    done()
});
