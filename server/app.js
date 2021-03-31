const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const fileUpload = require('express-fileupload');
const session = require('express-session');
const passport = require('passport');
const knexSession = require('connect-session-knex')(session);
const db = require('./services/db');
const { DAYS } = require('./lib/time');

const indexRouter = require('./routes/index');
const authRouter = require('./routes/auth');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(
  fileUpload({
    limits: { fileSize: 5 * 1024 * 1024 },
  })
);
app.use(express.static(path.join(__dirname, 'public')));
app.set('trust proxy', 1);

app.use(
  session({
    secret: process.env.SECRET_KEY,
    store: new knexSession({ knex: db }),
    resave: true,
    saveUninitialized: false,
    cookie: {
      maxAge: 1 * DAYS,
      secure: false,
    },
  })
); // TODO: Add secure session options
app.use(passport.initialize());
app.use(passport.session());

app.use('/api', indexRouter);
app.use('/auth', authRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
// eslint-disable-next-line no-unused-vars
app.use(function (err, req, res, next) {
  const isDevEnv = req.app.get('env') === 'development';
  if (isDevEnv) console.error(err);

  // render the error page
  res.status(err.status || 500).send({ error: err.message });
});

module.exports = app;
