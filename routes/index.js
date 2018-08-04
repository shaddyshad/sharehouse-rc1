var express = require('express');

var router = express.Router();

router.get('/dummy', function(req, res){
  res.render('preview');
});

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { user: {name: "Shad"} });
});

router.get('/another', function(req, res){
  res.render('search');
});



module.exports = router;
