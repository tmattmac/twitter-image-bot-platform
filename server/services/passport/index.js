const passport = require('passport');
const TwitterStrategy = require('passport-twitter').Strategy;
const createHttpError = require('http-errors');

// import db stuff
const { getUser, getOrCreateUser } = require('../db/user');

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
      done(null, user); // placeholder
    } catch (err) {
      done(err, false);
    }
  }
));

passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(async function (id, done) {
  try {
    const user = await getUser(id);
    if (user) {
      return done(null, user);
    }
    return done(createHttpError(403, "Unauthorized"))
  } catch (err) {
    done(err);
  }
})

module.exports = passport;