const { isAuthorized, checkGroup } = require("./middleware/");

const config = require("./config");
const constants = require("./core/helpers/const");

module.exports = function(app) {
  /*
          Global interceptors
      */
  app.all("/*", require("./interceptors/corsAllowHeaders"));

  app.all("/*", require("./interceptors/sessions"));

  app.all("/*", require("./core/request/logs"));

  app.use(config.api.urlPrefix + "/auth", require("./components/auth/"));

  app.use(config.api.urlPrefix + "/projects", require("./components/projects/"));

/*

    app.use(
        config.api.urlPrefix + "/provider-requests",
        require("./components/provider-requests/")
    );
*/


    /*
         Upload
     */
  app.post(
    config.api.urlPrefix + "/upload",
    isAuthorized,
    checkGroup(constants.roles.GROUPS.ADMINS, constants.roles.GROUPS.PROVIDERS,
      constants.roles.GROUPS.MEMBERS),
    require("./components/upload/")
  );
};
