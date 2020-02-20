const {Accounts, ProjectOptions, Projects} = require("../../db/models");
const Errors = require("../../core/Errors");
const projectsSchema = require("./schemas/createProject");


module.exports = async function (request, response, next) {
  try {

    let body = await projectsSchema.validateAsync(request.body, {
      //allowUnknown: true
    });

    body['owner'] = request.session.account._id;
    body['projectOptions'] = await ProjectOptions.find({$or:[{_id: body.projectOptions}, {group: 'init'}]});

    body['paymentAmount'] = body['projectOptions'].reduce((acc, item) => {
      return acc + item.amount
    }, 0);

    body['creationDate']= Math.floor(Number(new Date().getTime() / 1000));

    const result = await Projects.insert(body);

    response.json(result, 201);
  } catch (e) {
    return next(e);
  }
};