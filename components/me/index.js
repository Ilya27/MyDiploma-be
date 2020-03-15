const {isAuthorized} = require('../../middleware/');
const express = require('express');
const router = express.Router();


router.get('/me', isAuthorized, require('./getMe'));

router.put('/me', isAuthorized, require('./putMe'));

router.put('/me/password', isAuthorized, require('./changePassword'));

module.exports = router;