var express = require('express');
var router = express.Router();

/* GET a list of all users. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});


module.exports = router;
