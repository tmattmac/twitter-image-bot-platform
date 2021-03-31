const createHttpError = require('http-errors');

/**
 * Check files provided by express-fileupload
 */
function enforceFileLimits(req, res, next) {
  for (const file of Object.values(req.files)) {
    if (file.truncated) {
      return next(createHttpError(400, 'Files must be 5MB or smaller.'));
    }
    if (!/^image\//.test(file.mimetype)) {
      return next(createHttpError(400, 'File must be an image'));
    }
  }
  next();
}

module.exports = enforceFileLimits;
