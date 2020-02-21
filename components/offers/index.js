const express = require('express');
const router = express.Router();
const {isAuthorized} = require('../../middleware/');

/**
 @api {get} /offers offers list

 @apiGroup Offers

 @apiDescription
 Method creates a new support request and sends it to
 configured support email.

 @apiHeaderExample {json} Header-Example:
 {
       "Access-Token": "token",
       "Content-Type": "application/json"
  }

 @apiParamExample {json} Request-Example:
 {
 	    "email":"provider@provider.com",
 	    "text":"complain complain"
  }

 @apiPermission Providers, Members
 */

router.get('/', isAuthorized, require('./list'));

module.exports = router;
