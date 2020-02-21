const {Offers} = require("../../db/models");
const Errors = require('../../core/Errors');
const ListHelper = require('../../core/helpers/ListHelper');
const {roles} = require('../../core/helpers/const/');
const offersListSchema = require('./schemas/offersListSchema');


const getFindObjectByRole = {
    [roles.GROUPS.ADMIN]: require('./lists/admin'),
    [roles.GROUPS.COMPANY]: require('./lists/company'),
    [roles.GROUPS.CUSTOMER]: require('./lists/customer'),
};

module.exports = async function (request, response, next) {
    try {

        const query = await offersListSchema.validateAsync(request.query);
        const pagination = ListHelper.pagination({request});
        let {page, limit, sort_by, sort, ...searchOptions} = query;

        sort_by = sort_by || '_id';
        sort = sort || 'asc';

        const searchString = await getFindObjectByRole[request.session.account.role](request, response, searchOptions);

        const total = await Offers.count(searchString);
        const result = await Offers.find(searchString)
            .select('-__v ')
            .skip(pagination.offset)
            .limit(pagination.limit)
            .sort({[sort_by]: sort})
            .populate('projectId');

        const listItems = ListHelper.listItems({total, result, pagination});

        response.json(listItems);
    } catch (e) {
        return next(e);
    }
};
