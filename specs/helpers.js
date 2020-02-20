let config = require('../config/');
let icedfrisby = require('icedfrisby');
let joi = require('@hapi/joi');

global.frisbyConfig = {
    request: {
        baseUri: `http://${config.server.host}:${config.server.port}${config.api.urlPrefix}`,
        json: true,
        inspectOnFailure: true,
        headers: {
            'Content-Type': 'application/json',
        }
    },
    timeout: 5000
};

/* TODO SET UP DEFAULTS */

global.TESTS_INVALID_TOKEN = 'invalid_token';
global.TESTS_USER_TOKEN = 'admin_token';
global.frisby = icedfrisby;
global.joi = joi;
global.CONFIG = config;