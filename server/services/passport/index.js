const passport = require('passport');
const TwitterStrategy = require('passport-twitter').Strategy;

// import db stuff
const { getOrUpdateUser } = require('../db/user');

const {
  TWITTER_CONSUMER_KEY,
  TWITTER_CONSUMER_SECRET,
  TWITTER_OAUTH_CALLBACK_URL = "http://127.0.0.1/callback"
} = process.env;

passport.use(new TwitterStrategy({
  consumerKey: TWITTER_CONSUMER_KEY,
  consumerSecret: TWITTER_CONSUMER_SECRET,
  callbackURL: TWITTER_OAUTH_CALLBACK_URL
},
  (token, tokenSecret, profile, done) => {
    done(null, { userId: profile.displayName }); // placeholder
  }
));