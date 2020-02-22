const {mongoAdmins} = require("../../db/models");
const Errors = require('../../core/Errors');
const ListHelper = require('../../core/helpers/ListHelper');
const excludeObjectKeys = require('../../core/helpers/excludeObjectKeys');
const queryParamsSchema = require('./schemas/adminsListSchema');


module.exports = async function (request, response, next) {
    try {

        const query = await queryParamsSchema.validateAsync(request.query);
        const pagination = ListHelper.pagination({request});
        const searchOptions = excludeObjectKeys(query, ['page', 'limit']);
        const total = await mongoAdmins.count(searchOptions);

        const result = await mongoAdmins.find(searchOptions)
            .select('-password -salt -__v ')
            .skip(pagination.offset).limit(pagination.limit);

        const listItems = ListHelper.listItems({total, result, pagination});

        response.json(listItems);
    } catch (e) {
        return next(e);
    }
};
