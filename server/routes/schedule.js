const express = require('express');
const router = express.Router();
const isAuthenticated = require('../middleware/isAuthenticated');

const scheduleController = require('../controllers/schedule');

router.use(isAuthenticated);

router.patch('/:id', scheduleController.updateSchedule);

module.exports = router;
