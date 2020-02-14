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
global.TESTS_ADMIN_TOKEN = 'admin_token';
global.TESTS_PROVIDER_TOKEN = 'provider_token';
global.TESTS_PROVIDER_REGISTERED_TOKEN = 'provider_registered_token';
global.TESTS_MEMBER_TOKEN = 'member_token';
global.TESTS_MEMBER_2_TOKEN = 'member_token_2';
global.TESTS_MEMBER_2_DEPENDENT_TOKEN = 'member_token_2_dependent';
global.TESTS_MEMBER_UNREGISTERED_TOKEN = 'member_unregistered_token';
global.TESTS_MEMBER_UNREGISTERED_2_TOKEN = 'member_unregistered_2_token';
global.frisby = icedfrisby;
global.joi = joi;
global.CONFIG = config;