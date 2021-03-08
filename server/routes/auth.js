const express = require('express');
const router = express.Router();
const isAuthenticated = require('../middleware/isAuthenticated');
const passport = require('../services/passport');

router.get('/', passport.authenticate('twitter'));

router.get('/callback', passport.authenticate('twitter', {
  failureRedirect: '/error'
}), async (req, res, next) => {
    
});

router.get('/isAuthenticated', isAuthenticated, (req, res) => {
  return res.send({ user: req.user });
});

module.exports = router;