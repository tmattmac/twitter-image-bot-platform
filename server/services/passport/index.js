const passport = require('passport');
const TwitterStrategy = require('passport-twitter').Strategy;
const createHttpError = require('http-errors');
const { createJob } = require('../google/scheduler');

// import db stuff
const { getOrCreateUser } = require('../db/user');

const {
  TWITTER_CONSUMER_KEY,
  TWITTER_CONSUMER_SECRET,
  TWITTER_OAUTH_CALLBACK_URL = "http://127.0.0.1:3000/auth/callback"
} = process.env;


passport.use(new TwitterStrategy({
  consumerKey: TWITTER_CONSUMER_KEY,
  consumerSecret: TWITTER_CONSUMER_SECRET,
  callbackURL: TWITTER_OAUTH_CALLBACK_URL
},
  async (token, tokenSecret, profile, done) => {
    try {
      const user = await getOrCreateUser(profile.id, profile, token, tokenSecret);
      try {
        await createJob(profile.id);
      } catch (err) {
        if (err.code !== 6) { // ignore error if ALREADY_EXISTS error code from Google API
          throw createHttpError(502, 'Error creating schedule. Please try again later.');
        }
      }
      done(null, user);
    } catch (err) {
      done(err, false);
    }
  }
));

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(async function (user, done) {
  try {
    return done(null, user);
  } catch (err) {
    done(err);
  }
})

module.exports = passport;