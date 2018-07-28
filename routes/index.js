var express = require('express');
var {db_connection} = require('../app.js');

var router = express.Router();

//Database setup
var connection = db_connection;

db_config = {
	nr_retries: 5,
	retry_period: 1000 /*milliseconds*/
};

function nop(){} //do nothing

//early check
if(!connection){
	var i = 0;
	var found = false;
	for(; i < db_config.retries && !connection; ++i){
		console.log("Retrying connection ",i);
		setTimeout(nop, db_config.retry_period);
		
	}//we are either done looping or connection has been found, let's be persimistic
	if(i >= db_config.retries){
		console.error("Could not establish db connection in time.");
		process.exit(1);
	}
}


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
