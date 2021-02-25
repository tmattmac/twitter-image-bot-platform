const { Readable } = require('stream');

/**
 * Provide a readable stream from the buffer returned from express-fileupload
 */
function streamifyFiles(req, res, next) {
  req.files.forEach(file => {
    file.stream = file.data && Readable.from(file.data);
  });
  next();
}

module.exports = streamifyFiles;