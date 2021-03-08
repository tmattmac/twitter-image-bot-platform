const express = require('express');
const router = express.Router();
const authRouter = require('./auth');
const imagesRouter = require('./images');

router.use('/auth', authRouter);
router.use('/images', imagesRouter);

module.exports = router;
