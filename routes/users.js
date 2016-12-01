var models = require('../models');
var express = require('express');
var passport = require('passport');
var router = express.Router();

// URL: http://localhost:3100/users
// get all users
router.get('/', function(req, res) {
  models.User.findAll().then(function(users) {
    res.json({ users: users });
  });
});

// URL: http://localhost:3100/users/create
// create a user with an access token
router.post('/create', function(req, res) {
  models.User.create({
    username: req.body.username,
    token: req.body.token
  }).then(function() {
    res.json({ message: 'created user' });
  });
});

// URL: http://localhost:3100/users/get/:id
// get a user by their id
router.post('/get/:id', function(req, res) {
  models.User.find({
    where: {
      id: req.params.id
    }
  }).then(function(user) {
    res.json({ user: user });
  });
});

// URL: http://localhost:3100/users/update/:id
// find a user by their id and update their info
router.put('/update/:id', function(req, res) {
  models.User.find({
    where: {
      id: req.params.id
    }
  }).then(function(user) {
    if (user) {
      user.updateAttributes({
        username: req.body.username,
        token: req.body.token
      }).then(function(user) {
        res.json({ message: 'updated user info to ' + user });
      });
    }
  });
});

// URL: http://localhost:3100/users/delete/:id
// delete a user by their id (requires authentication)
router.get('/delete/:id',
  passport.authenticate('bearer', { session: false }),
  function(req, res) {
    models.User.destroy({
      where: {
        id: req.params.id
      }
    }).then(function() {
      res.json({ message: 'deleted user' });
    });
  });


module.exports = router;
