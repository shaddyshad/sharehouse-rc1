var express = require('express');

var router = express.Router();


/* GET home page. */
router.get('/', function(req, res) {
  req.isAuthenticated() ? res.redirect('/users/dashboard') : res.redirect('/users/login');
});

router.get('/register', function(req, res){
  req.isAuthenticated() ? res.redirect('/users/dashboard') : res.redirect('/users/register')
});

router.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
});

router.get('/error', function (req, res) {
    res.render('permission')
})


module.exports = router;
