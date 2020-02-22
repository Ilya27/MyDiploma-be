const {Accounts, ProjectOptions, Projects} = require("../../db/models");
const Errors = require("../../core/Errors");
const projectsSchema = require("./schemas/createProject");
const {roles} = require("../../core/helpers/const/");
const mailer = require("../../core/mailer/");


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

    const result = await Projects.insert(body);

    const accounts = await Accounts.find({role: roles.GROUPS.COMPANY});

    accounts.forEach(account => {
      mailer.sendMail(account.email, 'New Project', mailer._getTemplateFile(`new-project/project-suggest.html`))
    });

    response.json(result, 201);
  } catch (e) {
    return next(e);
  }
};
