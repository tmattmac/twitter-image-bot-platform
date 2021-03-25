const express = require('express');
const router = express.Router();
const isAuthenticated = require('../middleware/isAuthenticated');

const scheduleController = require('../controllers/schedule');

router.use(isAuthenticated);

router.patch('/', scheduleController.updateSchedule);

router.get('/', scheduleController.getSchedule);

module.exports = router;
