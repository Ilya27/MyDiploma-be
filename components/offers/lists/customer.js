const {projectFields} = require('../../../core/helpers/const/');
const {Projects} = require("../../../db/models");


module.exports = async (request, response, search) => {
    // get offers from CUSTOMER projects

    // get projects ids
    const owner = request.session.account._id;
    const projects = await Projects.find({
        owner,
        status: [
            projectFields.STATUSES.ACCEPTED,
            projectFields.STATUSES.CLOSED
        ]
    }).distinct('_id');

    const {..._search} = search;

    return {..._search, projectId: projects};
};
