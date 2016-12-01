var models = require('./models');
var express = require('express');
var serveStatic = require('serve-static');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var passport = require('passport');
var BearerStrategy = require('passport-http-bearer').Strategy;

// Routes
var routes = require('./routes/index');
var users  = require('./routes/users');
var constellations = require('./routes/constellations');

// Authentication strategy
// get token from user and check if it matches any in the database
passport.use(new BearerStrategy(
  function(token, cb) {
    models.User.findOne({
      where: {
        token: token
      }
    }).then(function(user, err) {
      if (err) { return cb(err); }
      if (!user) { return cb(null, false); }
      return cb(null, user);
    });
  }));

var app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(passport.initialize());

app.use('/', routes);
app.use('/users', users);
app.use('/constellations', constellations);

app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.json({
    message: err.message,
    error: (app.get('env') === 'development') ? err : {}
  });
});


module.exports = app;
