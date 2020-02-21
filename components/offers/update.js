const {Offers, Projects} = require("../../db/models");
const Errors = require('../../core/Errors');
const {projectFields, roles} = require('../../core/helpers/const/');
const updateOfferSchema = require('./schemas/updateOfferSchema');


module.exports = async function (request, response, next) {
    try {

        const body = await updateOfferSchema.body.validateAsync(request.body);
        const {id} = await updateOfferSchema.params.validateAsync(request.params);

        const {account} = request.session;


        const offer = await Offers.findOne({_id: id});

        if (!offer) {
            throw new Errors('Offer not found', 404);
        }

        if (offer.accountId !== account._id && account.role !== roles.GROUPS.ADMIN) {
            throw new Errors('', 403);
        }

        const project = await Projects.findOne({_id: offer.projectId});

        if (project.status !== projectFields.STATUSES.ACCEPTED) {
            throw new Errors('Sorry, this project is probably closed', 403);
        }

        await offer.update({...body}, {new: true});

        const result = await Offers.findOne({_id: offer._id}); // because {new: true} option in .update method  don`t work

        response.json(result);
    } catch (e) {
        return next(e);
    }
};
