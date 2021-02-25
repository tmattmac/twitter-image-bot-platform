var express = require('express');
var router = express.Router();
const { Readable } = require('stream');

const { uploadToBucket, createBucket } = require('../services/google/storage');

/* GET home page. */
router.post('/test', streamifyFiles, async function (req, res, next) {
  try {
    uploadToBucket('n/a', req.files.file.stream).then(() => res.send("uploaded")).catch(err => next(err));
  } 
  catch (err) {
    console.log(err);
    next(err);
  }
});

module.exports = router;
