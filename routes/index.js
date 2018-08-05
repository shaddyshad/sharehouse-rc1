var express = require('express');

var router = express.Router();


/* GET home page. */
router.get('/', function(req, res) {
  res.render('login', { user: {name: "Shad"} });
});

router.get('/register', function(req, res){
  res.render('register');
});

router.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
});


module.exports = router;
