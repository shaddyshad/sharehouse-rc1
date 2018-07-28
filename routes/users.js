var express = require('express');
var {db_connection} = require('../app.js');

var router = express.Router();

/*DB - A minor hack around asynchronous behaviour of JS
* Since this route might be accessed before the db connection, in the root file has been completed, it is important that we poll the connection for some time before giving up.
* This snippet polls the connection every 1000 ms, for 5 times after which the application can assume no connection and exit with a status code 1.
* A better mechanism will be sought.
*/
var connection = db_connection;
db_config = {
	nr_retries: 5,
	retry_period: 1000 /*1 second = 1000ms*/
}
if(!connection){
	var i = 0;
	for(; i < db_config.nr_retries; ++i){
		console.log("Retrying connection...: ", i);
		setTimeout(nop, db_config.retry_period);
	}
	if(i >= db_config.retries){
		console.error("Could not establish connection in time. ");
		process.exit();
	}
}
function nop() {}

/* GET a list of all users. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});


module.exports = router;
