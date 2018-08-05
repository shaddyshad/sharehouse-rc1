const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const bcrypt = require('bcrypt');

const connection = require('./database.js');
var {Users, Warehouse} = require('../models');


const router = express.Router();

mongoose.connection = connection;

/* GET a list of all users. */
router.get('/', function(req, res, next) {
	Users.find({})
	.then(function(users){
        res.send(users);
	})
	.catch(function(err){
				console.error(err);
				res.json({"status": "404", "message": "Error fetching users."})
	});
});

/*POST a user to the database*/
router.post('/', function(req, res, next){
    const _userForm = req.body;

    //Generate the has
    const saltRounds = 10;
    const _password = _userForm.password;
    const salt = bcrypt.genSaltSync(saltRounds);
    const _passwordHash = bcrypt.hashSync(_password, salt);

    //create a user object
    const user = {
        username: req.body.name,
        email: req.body.email,
        password: _passwordHash,
        user_type: req.body.type
    };


    const _user = Users.create(user);

    _user.then(function(user){
    	//send mail confirmation
		res.redirect('/users/login')
	}).catch(function(err){
		console.error(err);
		res.redirect('register');
	});
});

//Login functionality
router.post('/login', function (req, res, next) {
    passport.authenticate('local', (err, user, info) => {
        if(err) console.error(err);
        req.login(user, (err) => {
            if(err){
                res.send("Not aauthenticated \n");
            }else
                return res.send('You were authenticated & logged in!\n');
        });
    })(req, res, next);
});

router.get('/login', function (req, res) {
	res.render('login');
});

//Register functionality
router.get('/register', function (req, res) {
	res.render('register');
});


/*GET a specific user*/
router.get('get/:username', function(req, res, next){
    let _username = req.params.username;
    if(!_username){
		res.json({"status":"error", "message":"No supplied argument"});
	}
	Users.findOne({username: _username}, function(err, user){
		if(err){
			console.log("Error get username: ", err);
			res.json({"status":"error", "message":"No record found"});
		}
        const _user = JSON.stringify(user);
        res.json(_user);
	});
});

router.get('/dashboard', function (req, res) {
    res.render('dashboard', {warehouses: [
            {
                name: "WH Operators",
                location: "Tema",
                area: 1800,
                price: 5,
                free: 1200,
                _id: 1123432432
            }
        ]});
});



exports.usersRouter = router;
exports.Users = Users;
// module.exports = router;
