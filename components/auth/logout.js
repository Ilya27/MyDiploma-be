const constants = require('../../core/helpers/const');

module.exports = async function (request, response, next) {

  request.session.status = constants.statuses.SESSION_STATUS.CLOSED;
  const result = await request.session.save();

  response.json({
    token: result.token,
    status: result.status
  });
};
