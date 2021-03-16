const express = require('express');
const router = express.Router();
const imagesRouter = require('./images');
const scheduleRouter = require('./schedule');

router.use('/images', imagesRouter);
router.use('/schedule', scheduleRouter);

module.exports = router;
