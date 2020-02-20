const express = require('express');
const router = express.Router();
/**
 * @api {post} /contact-us/ add support request
 *
 * @apiGroup Support Requests
 *
 * @apiDescription
 * Method creates a new support request and sends it to
 * configured support email.
 *
 * @apiHeaderExample {json} Header-Example:
 * {
 *      "Access-Token": "token",
 *      "Content-Type": "application/json"
 * }
 *
 * @apiParamExample {json} Request-Example:
 * {
 *	    "email":"provider@provider.com",
 *	    "text":"complain complain"
 * }
 *
 * @apiPermission Providers, Members
 *
 */
router.post(
    '/',
    require('./addSupportRequest')
);

module.exports = router;
