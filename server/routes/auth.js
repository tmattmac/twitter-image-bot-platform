const express = require('express');
const router = express.Router();

router.get('/auth', passport.authenticate('twitter'));

router.get('/auth/callback', passport.authenticate('twitter'));

module.exports = router;