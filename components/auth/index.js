const express = require('express');
const {isAuthorized} = require('../../middleware');
const router = express.Router();

router.post('/authorize', require('./authorize'));


router.post('/registration/customer', require('./customerRegistration'));


router.delete('/logout', isAuthorized, require('./logout'));

router.get('/check-email/:email', require('./checkEmail'));

//
// /**
//  * @api {post} /auth/password/recovery password recovery
//  *
//  * @apiGroup Auth
//  *
//  * @apiDescription
//  * Method requests password recovery
//  *
//  * @apiHeaderExample {json} Header-Example:
//  * {
//  *      "Content-Type": "application/json"
//  * }
//  *
//  * @apiParamExample {json} Request-Example
//  * {
//  *	    "email": "mail@gmail.com",
//  *	    "type": "provider"
//  * }
//  *
//  * @apiPermission none
//  *
//  * @apiSuccessExample {json} Success-Response:
//  *  HTTP/1.1 200 OK
//  *  {
//  *    "result": "ok"
//  *  }
//  */
// router.post('/password/recovery', require('./passwordRecovery'));
//
// /**
//  * @api {put} /auth/password/reset password reset
//  *
//  * @apiGroup Auth
//  *
//  * @apiDescription
//  * Method requests password reset
//  *
//  * @apiHeaderExample {json} Header-Example:
//  * {
//  *      "Content-Type": "application/json"
//  * }
//  *
//  * @apiParamExample {json} Request-Example
//  * {
//  *	    "token": "token",
//  *      "password": "test"
//  * }
//  *
//  * @apiPermission none
//  *
//  * @apiSuccessExample {json} Success-Response:
//  *  HTTP/1.1 200 OK
//  *  {
//  *    "result": "success"
//  *  }
//  */
// router.put('/password/reset', require('./passwordReset'));
//
// /**
//  * @api {get} /auth/check/reset-token check reset token
//  *
//  * @apiGroup Auth
//  *
//  * @apiDescription
//  * Method checks if password reset link/token is active
//  *
//  * @apiHeaderExample {json} Header-Example:
//  * {
//  *      "Content-Type": "application/json"
//  * }
//  *
//  * @apiParamExample {json} Request-Example
//  * {
//  *	    "token": "token",
//  *      "password": "test"
//  * }
//  *
//  * @apiPermission none
//  *
//  * @apiSuccessExample {json} Success-Response active:
//  *  HTTP/1.1 200 OK
//  *  {
//  *    "status": "active"
//  *  }
//  * @apiErrorExample Token not found:
//  *     HTTP/1.1 404 Not Found
//  *     {
//  *          "message": "Request not exist",
//  *          "stack": "stacktrace"
//  *     }
//  *
//  * @apiErrorExample Link expired:
//  *     HTTP/1.1 400 Bad Request
//  *     {
//  *          "message": "link time has expired",
//  *          "stack": "stacktrace"
//  *     }
//  *
//  * @apiErrorExample Link already used:
//  *     HTTP/1.1 400 Bad Request
//  *     {
//  *          "message": "link already used",
//  *          "stack": "stacktrace"
//  *     }
//  */
// router.get('/check/reset-token', require('./checkResetToken'));

module.exports = router;
