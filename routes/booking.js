var express = require('express');
var mongoose = require('mongoose');
var connection = require('./database');

var router = express.Router();

mongoose.connection = connection;

router.get('/', function(req, res, next){
  res.send("Reply with a resource");
})

module.exports = router;
