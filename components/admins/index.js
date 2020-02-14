const {isAuthorized, checkGroup} = require('../../middleware/');
const express = require('express');
const router = express.Router();
const constants =require('../../core/helpers/const');
/**
 * @api {get} /admins admins list
 *
 * @apiGroup Admins
 *
 * @apiDescription
 * Method returns list of all admins</br>
 *
 * @apiPermission Admins
 *
 * @apiSuccessExample {json} Success-Response:
 *  HTTP/1.1 200 OK
 *  {
 *      "total": 1,
 *      "totalPages": 1,
 *      "limit": 10,
 *      "page": 1,
 *      "result": [
 *          {
 *              "_id": 1,
 *              "login": "admin"
 *          }
 *      ]
 *  }
 */
router.get('/', isAuthorized, checkGroup(constants.roles.GROUPS.ADMINS), require('./adminsList'));

module.exports = router;
