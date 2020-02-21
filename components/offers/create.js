const {Offers, Projects} = require("../../db/models");
const Errors = require('../../core/Errors');
const {projectFields} = require('../../core/helpers/const/');
const createOfferSchema = require('./schemas/createOfferSchema');


module.exports = async function (request, response, next) {
    try {

        const body = await createOfferSchema.validateAsync(request.body);

        const project = await Projects.findOne({_id: body.projectId});

        if (!project) {
            throw new Errors('Project not found', 404);
        }

        if (project.status !== projectFields.STATUSES.ACCEPTED) {
            throw new Errors('Sorry, this project is probably closed', 403);
        }

        body['accountId'] = request.session.account._id;

        const result = await Offers.insert(body);

        response.json(result);
    } catch (e) {
        return next(e);
    }
};
