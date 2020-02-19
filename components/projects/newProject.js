const {Accounts} = require("../../db/models");
const Errors = require("../../core/Errors");
const projectsSchema = require("./schemas/createProject");


module.exports = async function (request, response, next) {
  try {

    let body = await projectsSchema.validateAsync(request.body, {
      allowUnknown: true
    });
    const accountRole = await Accounts.findById(body.owner);

    if(accountRole.role !== 'CUSTOMER') {
      throw new Errors('You can\'t create a new project', 404)
    }

    response.json(body, 201);
  } catch (e) {
    return next(e);
  }
};