var models = require('../models');
var express = require('express');
var passport = require('passport');
var router = express.Router();

// URL: http://localhost:3100/
// displays a welcome message
router.get('/', function(req, res) {
	res.json({
		message: 'welcome to the api!'
	});
});

module.exports = router;
