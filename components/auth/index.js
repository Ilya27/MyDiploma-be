const express = require('express');
const {isAuthorized} = require('../../middleware');
const router = express.Router();


/**
 * @api {post} /auth/authorize authorize
 *
 * @apiGroup Auth
 *
 * @apiDescription
 * Method creates user session and returns a token.
 *
 * @apiPermission none
 *
 * @apiSuccessExample {json} Success-Response:
 *  HTTP/1.1 201 Created
 *  {
 *   "status": "active",
 *   "group": "Providers",
 *   "token": "token",
 *   "subject": {
 *       "registrationStatus": "unregistered",
 *       "updatingStatus": "none",
 *       "_id": 1,
 *       "externalId": 11111
 *   },
 *   "creationDate": 1576672943568,
 *   "_id": 3,
 *   "__v": 0
 *  }
 */
router.post('/authorize', require('./authorize'));

// /**
//  * @api {delete} /auth/logout logout
//  *
//  * @apiGroup Auth
//  *
//  * @apiDescription
//  * Method ends user session and marks the token as invalid.
//  *
//  * @apiHeaderExample {json} Header-Example:
//  *     {
//  *       "Access-Token": "token"
//  *     }
//  *
//  * @apiPermission anyone with an active token
//  *
//  * @apiSuccessExample {json} Success-Response:
//  *  HTTP/1.1 200 OK
//  *  {
//  *    "group": "Providers",
//  *    "token": "token",
//  *    "status": "closed"
//  *  }
//  */
// router.delete('/logout', isAuthorized, require('./logout'));
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
