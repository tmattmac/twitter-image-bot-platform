const {
  uploadToBucket,
  getFilesFromBucket,
  getFileFromBucket,
  updateFileMetadata,
  deleteFile
} = require('../services/google/storage');

async function uploadImage(req, res, next) {
  try {
    const { file } = req.files;
    const fileId = await uploadToBucket(req.user.id, file.stream, file.mimetype);
    res.status(201).send({
      message: 'uploaded successfully',
      id: fileId,
      url: `/api/images/${fileId}`
    });
  } 
  catch (err) {
    console.log(err);
    next(err);
  }
};

async function getImages(req, res, next) {
  try {
    const files = await getFilesFromBucket(req.user.id);
    const responseObject = files.map(file => {
      const id = file.name.split('/')[1]; // file.name => {userId}/{fileId}
      return {
        id,
        source: file.metadata.source || '',
        url: `/api/images/${id}`
      }
    });

    res.send({ files: responseObject });
  } 
  catch (err) {
    console.log(err);
    next(err);
  }
};

async function getImage(req, res, next) {
  try {
    const fileId = req.params.id;
    const [file, contentType] = await getFileFromBucket(req.user.id, fileId);
    res
      .setHeader('content-type', contentType)
      .setHeader('Cache-Control', 'public, max-age=31536000');
    file.pipe(res);
  } 
  catch (err) {
    console.log(err);
    next(err);
  }
}

async function updateImageMetadata(req, res, next) {
  try {
    const metadata = req.body.metadata;
    updateFileMetadata(req.user.id, metadata).then((resp) => res.send(resp)).catch(err => next(err));
  } 
  catch (err) {
    console.log(err);
    next(err);
  }
};

async function deleteImage(req, res, next) {
  try {
    const fileId = req.params.id;
    deleteFile(req.user.id, fileId).then((resp) => res.send(resp)).catch(err => next(err));
  } 
  catch (err) {
    console.log(err);
    next(err);
  }
};




module.exports = {
  uploadImage,
  getImages,
  getImage,
  updateImageMetadata,
  deleteImage
}