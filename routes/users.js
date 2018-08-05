var express = require('express');
var mongoose = require('mongoose');
var passport = require('passport');

var connection = require('./database.js');
var {Users} = require('../models');


var router = express.Router();

mongoose.connection = connection;

/* GET a list of all users. */
router.get('/', function(req, res, next) {
	Users.find({})
	.then(function(users){
			var _users = JSON.stringify(users);
			res.json(_users);
	})
	.catch(function(err){
				console.error(err);
				res.json({"status": "404", "message": "Error fetching users."})
	});
});

/*POST a user to the database*/
router.post('/', function(req, res, next){
	var _userForm = req.body;
	//TODO insert form verification here
	var userType = _userForm.user_type;
	var _type = userType == "operator";
	var _user = Users.create({username: req.body.username, password: req.body.password, user_type: _type});
	_user.then(function(user){
		console.log("Added user: ", user);
		res.json({"status": "200", "message": "Added  succesfully"});
	}).catch(function(err){
		console.error("Error adding user ",err);
		res.json({"status":"1", "message": "Failed to add object to the db."});
	});
});

function isValidUsername(username){
	var nameReg = new RegExp(/([A-Za-z]){4,10}$/);
	return (username.match(nameReg) !== null);
}

function isValidEmail(email){
	mail = new RegExp(/[A-Za-z._]+@[A-Za-z]+\.[A-Za-z]{3,}$/);
	return(email.match(mailReg) !== null);
}

function verify_password(pwd1, pwd2){
	//Will improve with hashing, but right now, act as a stub for a raw password
	//FIXME remove stub
	return pwd1 === pwd2;
}

//Login functionality
router.post('/login', passport.authorize('local', {
	successRedirect: '/index',
	failureRedirect: '/'
}));

router.get('/login', function (req, res) {
	res.render('login');
});

//Register functionality
router.get('/register', function (req, res) {
	res.render('register');
});

router.post('/register', function(req, res){
	//register a user
	if(req.isAuthenticated()){
		res.redirect('/index');
	}

	//Just encrypt the password
    // Generate Password
    const saltRounds = 10;
    const _password = req.body.password;
    const salt = bcrypt.genSaltSync(saltRounds);
    const _passwordHash = bcrypt.hashSync(_password, salt);

    var user = {
        username: req.body.name,
        email: req.body.email,
        password: _passwordHash,
        user_type: true
    };

    //Store the details
	var newUser = new User(user);
	newUser.save()
		.then(function (user) {
			//send mail confirmation, in the meantime, take them to that page
			res.render('confirmation');
        })
		.catch(function (err) {
			console.error(err);
			res.send("Could not register you.");
        });


});

/*GET a specific user*/
router.get('/:username', function(req, res, next){
	var _username = req.params.username;
	if(!_username){
		res.json({"status":"error", "message":"No supplied argument"});
	}
	Users.findOne({username: _username}, function(err, user){
		if(err){
			console.log("Error get username: ", err);
			res.json({"status":"error", "message":"No record found"});
		}
		var _user = JSON.stringify(user);
		res.json(_user);
	});
})



exports.usersRouter = router;
exports.Users = Users;
// module.exports = router;
