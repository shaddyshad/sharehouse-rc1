var express = require('express');

var router = express.Router();

router.get('/dummy', function(req, res){
  res.render('index');
});

/* GET home page. */
router.get('/', function(req, res) {
  res.render('login', { user: {name: "Shad"} });
});

router.get('/another', function(req, res){
  res.render('search');
});



module.exports = router;
