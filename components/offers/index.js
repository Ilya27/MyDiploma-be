const express = require('express');
const router = express.Router();
const {isAuthorized, checkGroup} = require('../../middleware/');
const {roles} = require('../../core/helpers/const/');

/**
 @api {get} /offers offers list

 @apiGroup Offers

 @apiDescription
 list of offers

 @apiHeaderExample {json} Header-Example:
 {
       "Access-Token": "token",
       "Content-Type": "application/json"
  }

 @apiParamExample {json} Request-Example:
 {
    "total": 1,
    "totalPages": 1,
    "limit": 10,
    "page": 1,
    "result": [
        {
            "files": [],
            "_id": 3,
            "accountId": 3,
            "thumbnailUrl": "/thumbnailUrl",
            "demoPdfUrl": "/demoPdfUrl",
            "creationDate": 1582216927,
            "description": "test",
            "projectId": {
                "status": "ACCEPTED",
                "paymentStatus": "WAIT",
                "winnerIds": [],
                "projectOptions": [],
                "_id": 4,
                "owner": 1,
                "email": "test@sdfsdf",
                "name": "some name",
                "category": "BUILDING",
                "creationDate": 1582276363,
                "__v": 0
            }
        }
    ]
}

 @apiPermission All Users
 */

router.get('/', isAuthorized, require('./list'));

// todo add documentation
router.post('/', isAuthorized, checkGroup(roles.GROUPS.COMPANY), require('./create'));

module.exports = router;
