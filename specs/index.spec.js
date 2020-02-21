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

    const insertData = require('./insertData');
    await insertData();


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
