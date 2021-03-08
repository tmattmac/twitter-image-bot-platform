const { uploadToBucket, getFilesFromBucket } = require('../services/google/storage');

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

module.exports = {
  uploadImage,
  getImages
}