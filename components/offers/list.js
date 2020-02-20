const {Offers} = require("../../db/models");
const Errors = require('../../core/Errors');
const ListHelper = require('../../core/helpers/ListHelper');
const {roles} = require('../../core/helpers/const/');
const offersListSchema = require('./schemas/offersListSchema');


const logic = {
    [roles.GROUPS.ADMIN]: async (request, response) => {

        return {};
    },

    [roles.GROUPS.COMPANY]: async (request, response) => {
        return {};
    },

    [roles.GROUPS.CUSTOMER]: async (request, response) => {
        // todo get offers where accountId === se
        return {};
    },
};


module.exports = async function (request, response, next) {
    try {

        const query = await offersListSchema.validateAsync(request.query);
        const pagination = ListHelper.pagination({request});
        const { page, limit, ...searchOptions } = query;

        const total = await Offers.count(searchOptions);

        const result = await Offers.find(searchOptions)
            .select('-__v ')
            .skip(pagination.offset).limit(pagination.limit);

        const listItems = ListHelper.listItems({total, result, pagination});

        //const result = await logic[request.session.account](request, response);

        response.json(listItems);
    } catch (e) {
        return next(e);
    }
};
