const express = require("express");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
const {version, author} = require('./package.json');
const router = require("./router");
const config = require("./config/");
const colors = require('./core/helpers/colors');


const API_REVISION = 1;
const API_VERSION = version;

global.Promise = require("bluebird");

async function runServer() {
    try {
        const dbConnection = await require("./db/mongo.js");
        console.log(`Connected to mongoDB ${colors.font.Green}`, 'successfully');

        // TODO remove later
        const {Accounts} = require('./db/models');
        const count = await Accounts.count();
        if (count < 1) {
            await Accounts.insert({
                login:config.api.defaultAdminLogin,
                password: config.api.defaultAdminPassword,
                email: config.api.defaultAdminEmail,
                role:'ADMIN',
                stripeId:'--',
                phoneNumber:'--'
            })
        }

        const app = express();

        app.use(bodyParser.json());

        global.stripe = require('stripe')(config.external.stripeKey);

        app.use((request, response, next) => {
            request.app_config = config;
            request.API_REVISION = API_REVISION;
            request.API_VERSION = API_VERSION;
            request.MONGO_CONNECTION = dbConnection;
            request.author = author;
            next();
        });

        app.use(fileUpload());

        app.use(require('./core/response/json'));

        router(app);

        app.use(require('./core/response/errors/notImplemented'));

        app.use(require('./core/response/errors/globalErrors'));

        app.listen(config.server.port, () => {
            console.log(
                `Server is started at http://localhost:%s`,
                config.server.port
            );
        });

        if (process.env.NODE_ENV) {
            const docStaticServer = require("./staticServer");
            docStaticServer();
        }


    } catch (e) {
        console.log(e);
        throw e;
    }
}

runServer();
