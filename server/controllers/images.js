const {
  uploadToBucket,
  getFilesFromBucket,
  updateFileMetadata,
  deleteFile
} = require('../services/google/storage');

async function uploadImage(req, res, next) {
  try {
    uploadToBucket(req.user.id, req.files.file.stream).then(() => res.send("uploaded")).catch(err => next(err));
  } 
  catch (err) {
    console.log(err);
    next(err);
  }
};

async function getImages(req, res, next) {
  try {
    getFilesFromBucket(req.user.id).then((resp) => res.send(resp)).catch(err => next(err));
  } 
  catch (err) {
    console.log(err);
    next(err);
  }
};

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
  updateImageMetadata,
  deleteImage
}