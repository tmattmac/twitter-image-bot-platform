const express = require('express');
const router = express.Router();
const isAuthenticated = require('../middleware/isAuthenticated');
const streamifyFiles = require('../middleware/streamifyFiles');

const imagesController = require('../controllers/images');

router.use(isAuthenticated);

router.post('/', streamifyFiles, imagesController.uploadImage);

router.get('/', imagesController.getImages);

router.get('/:id', imagesController.getImage);

router.patch('/:id', imagesController.updateImageMetadata);

router.delete('/:id', imagesController.deleteImage);

module.exports = router;
