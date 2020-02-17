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

  /*  const {mongoSessions, mongoAdmins, mongoProviders, mongoMembers} = require('../db/models');

    const testAdmin = await mongoAdmins.insert({login: 'testAdmin', password: 'testAdmin', email: 'qwerty@qwerty.qwe'});
    console.log(`admin created`);
    const adminSession = new mongoSessions({
        group: roles.GROUPS.ADMINS,
        token: TESTS_ADMIN_TOKEN,
        subject: testAdmin._id,
        creationDate: new Date().getTime(),
        ipAddress: "::ffff:127.0.0.1",
    });
    await adminSession.save();
    console.log(`admin session created`);

    const testProvider = await mongoProviders.insert({
        registrationStatus: statuses.PROVIDER_REGISTRATION_STATUS.UNREGISTERED,
        updatingStatus: statuses.PROVIDER_UPDATING_STATUS.NONE,
        externalId: 726538,
        npi: "1700989241",
        taxId: "593641476",
    });
    console.log(`Guest provider created`);
    const providerSession = new mongoSessions({
        group: roles.GROUPS.PROVIDERS,
        token: TESTS_PROVIDER_TOKEN,
        subject: testProvider._id,
        creationDate: new Date().getTime(),
        ipAddress: "::ffff:127.0.0.1",
    });
    await providerSession.save();
    console.log(`Guest provider session created`);

    const testProviderRegistered = await mongoProviders.insert({
        registrationStatus: statuses.PROVIDER_REGISTRATION_STATUS.APPROVED,
        updatingStatus: statuses.PROVIDER_UPDATING_STATUS.NONE,
        externalId: 726538,
        password: "testProvider",
        login: "testProvider",
        email: "testProvider@example.com",
        taxId: "593641476",
        npi: "1700989241",
        address: "testProvider",
        city: "testProvider",
        firstName: "testProvider",
        lastName: "testProvider",
        phone: "(111) 111-1111",
        providerName: "testProvider",
        state: "DE",
        verificationDocumentUrl: "https://example.com",
        zip: "00000",
    });
    console.log(`registered provider created`);
    const providerRegisteredSession = new mongoSessions({
        group: roles.GROUPS.PROVIDERS,
        token: TESTS_PROVIDER_REGISTERED_TOKEN,
        subject: testProviderRegistered._id,
        creationDate: new Date().getTime(),
        ipAddress: "::ffff:127.0.0.1",
    });
    await providerRegisteredSession.save();
    console.log(`registered provider session created`);

    const testMember = await mongoMembers.insert({
        registrationStatus: statuses.MEMBER_REGISTRATION_STATUS.REGISTERED,
        email: "testMember@example.com",
        birthday: "1980-12-04",
        avatarUrl: "",
        externalId: "441",
        firstName: "Keval",
        lastName: "Patel",
        login: "testMember",
        password: "testMember",
    });
    console.log(`member created`);
    const memberSession = new mongoSessions({
        group: roles.GROUPS.MEMBERS,
        token: TESTS_MEMBER_TOKEN,
        subject: testMember._id,
        creationDate: new Date().getTime(),
        ipAddress: "::ffff:127.0.0.1",
    });
    await memberSession.save();
    console.log(`member session created`);

    const testMember2 = await mongoMembers.insert({
        registrationStatus: statuses.MEMBER_REGISTRATION_STATUS.REGISTERED,
        email: "testMember2@example.com",
        birthday: "1969-12-01",
        avatarUrl: "",
        externalId: "466",
        firstName: "THOMAS",
        lastName: "GLAZIER",
        login: "testMember2",
        password: "testMember2",
    });
    console.log(`second member created`);
    const member2Session = new mongoSessions({
        group: roles.GROUPS.MEMBERS,
        token: TESTS_MEMBER_2_TOKEN,
        subject: testMember2._id,
        creationDate: new Date().getTime(),
        ipAddress: "::ffff:127.0.0.1",
    });
    await member2Session.save();
    console.log(`second member session created`);

    const testMember2Dependent = await mongoMembers.insert({
        registrationStatus: statuses.MEMBER_REGISTRATION_STATUS.REGISTERED,
        email: "testMember2Dep@example.com",
        birthday: "1969-06-12",
        avatarUrl: "",
        externalId: "467",
        firstName: "ELAINE",
        lastName: "GLAZIER",
        login: "testMember2Dep",
        password: "testMember2Dep",
    });
    console.log(`second member dependent created`);
    const member2DependentSession = new mongoSessions({
        group: roles.GROUPS.MEMBERS,
        token: TESTS_MEMBER_2_DEPENDENT_TOKEN,
        subject: testMember2Dependent._id,
        creationDate: new Date().getTime(),
        ipAddress: "::ffff:127.0.0.1",
    });
    await member2DependentSession.save();
    console.log(`second member dependent session created`);

    const unregisteredMember = await mongoMembers.insert({
        registrationStatus: statuses.MEMBER_REGISTRATION_STATUS.UNREGISTERED,
        birthday: "1997-10-25",
        avatarUrl: "",
        externalId: "468",
        firstName: "SIERRA",
        lastName: "GLAZIER",
    });
    console.log(`unregistered member created`);
    const unregisteredMemberSession = new mongoSessions({
        group: roles.GROUPS.MEMBERS,
        token: TESTS_MEMBER_UNREGISTERED_TOKEN,
        subject: unregisteredMember._id,
        creationDate: new Date().getTime(),
        ipAddress: "::ffff:127.0.0.1",
    });
    await unregisteredMemberSession.save();
    console.log(`unregistered member session created`);

    const unregisteredMember2 = await mongoMembers.insert({
        registrationStatus: statuses.MEMBER_REGISTRATION_STATUS.UNREGISTERED,
        birthday: "1997-10-25",
        avatarUrl: "",
        externalId: "468",
        firstName: "SIERRA",
        lastName: "GLAZIER",
    });
    console.log(`second unregistered member created`);
    const unregisteredMember2Session = new mongoSessions({
        group: roles.GROUPS.MEMBERS,
        token: TESTS_MEMBER_UNREGISTERED_2_TOKEN,
        subject: unregisteredMember2._id,
        creationDate: new Date().getTime(),
        ipAddress: "::ffff:127.0.0.1",
    });
    await unregisteredMember2Session.save();
    console.log(`second unregistered member session created`);*/

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
