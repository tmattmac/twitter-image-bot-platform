const createHttpError = require('http-errors');

function isAuthenticated(req, res, next) {
  if (req.isAuthenticated()) next();
  else next(createHttpError(403, 'Unauthorized'));
}

module.exports = isAuthenticated;
