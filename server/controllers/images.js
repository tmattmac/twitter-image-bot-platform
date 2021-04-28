const createError = require('http-errors');
const sortFilesByDate = require('../helpers/sortFilesByDate');
const {
  uploadToBucket,
  getFilesFromBucket,
  getFileFromBucket,
  updateFileMetadata,
  deleteFile,
} = require('../services/google/storage');
const validateTweetLength = require('../helpers/validateTweetLength');

async function uploadImage(req, res, next) {
  try {
    const { file } = req.files;
    const fileId = await uploadToBucket(
      req.user.id,
      file.stream,
      file.mimetype
    );
    res.status(201).send({
      message: 'uploaded successfully',
      id: fileId,
      url: `/api/images/${fileId}`,
    });
  } catch (err) {
    next(err);
  }
}

async function getImages(req, res, next) {
  try {
    const files = await getFilesFromBucket(req.user.id);
    sortFilesByDate(files);
    const responseObject = files.map((file) => {
      const id = file.name.split('/')[1]; // file.name => {userId}/{fileId}
      return {
        id,
        caption: file.metadata.metadata?.caption || '',
        url: `/api/images/${id}`,
      };
    });

    res.send({ files: responseObject });
  } catch (err) {
    next(err);
  }
}

async function getImage(req, res, next) {
  try {
    const fileId = req.params.id;
    const [file, contentType] = await getFileFromBucket(req.user.id, fileId);
    res
      .setHeader('content-type', contentType)
      .setHeader('Cache-Control', 'public, max-age=31536000');
    file.pipe(res);
  } catch (err) {
    next(err);
  }
}

async function updateImageMetadata(req, res, next) {
  try {
    const metadata = req.body.metadata;
    const fileId = req.params.id;

    if (!validateTweetLength(metadata.caption)) {
      return next(createError('Caption must be less than 280 characters'));
    }

    await updateFileMetadata(req.user.id, fileId, metadata);
    res.send({
      message: 'successfully updated metadata',
      id: fileId,
      metadata,
    });
  } catch (err) {
    next(err);
  }
}

async function deleteImage(req, res, next) {
  try {
    const fileId = req.params.id;
    await deleteFile(req.user.id, fileId);
    res.send({
      message: 'successfully deleted file',
      id: fileId,
    });
  } catch (err) {
    next(err);
  }
}

module.exports = {
  uploadImage,
  getImages,
  getImage,
  updateImageMetadata,
  deleteImage,
};
