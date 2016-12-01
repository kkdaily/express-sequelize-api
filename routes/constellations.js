var models = require('../models');
var express = require('express');
var passport = require('passport');
var router = express.Router();

// URL: http://localhost:3100/constellations/
// get all constellations
router.get('/', function(req, res) {
  models.Constellation.findAll({}).then(function(constellations) {
    res.json({
      constellations: constellations
    });
  });
});

// URL: http://localhost:3100/constellations/create
// create a constellation
router.post('/create', function(req, res) {
	models.Constellation.create({
    name: req.body.name,
    meaning: req.body.meaning
	}).then(function() {
		res.json({ message: 'created constellation' });
	});
});

// URL: http://localhost:3100/constellations/get/:id
// get a single constellation by its id
router.get('/get/:id', function(req, res) {
  models.Constellation.find({
    where: {
      id: req.params.id
    }
  }).then(function(constellation) {
    res.json({
      constellation: constellation
    });
  });
});

// URL: http://localhost:3100/constellations/get/:name
// get a single constellation by its name
router.get('/get/:name', function(req, res) {
  models.Constellation.findOne({
    where: {
      name: req.params.name
    }
  }).then(function(constellation) {
    res.json({
      constellation: constellation
    });
  });
});

// URL: http://localhost:3100/constellations/delete/:id
// delete a constellation by its id (requires authentication)
router.get('/delete/:id',
  passport.authenticate('bearer', { session: false }),
  function(req, res) {
  	models.Constellation.destroy({
  		where: {
  			id: req.params.id
  		}
  	}).then(function() {
  		res.json({ message: 'deleted constellation' });
  	});
  });


module.exports = router;
