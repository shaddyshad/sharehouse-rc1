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
	if(req.isAuthenticated()){
	    //Show the index page
        const user = req.user;
        Warehouse.find({operator: user}).then(function(list){
            res.render('dashboard', {warehouses: list, user: user})
        }).catch(function (err) {
            throw err;
        });
    }else{
        res.send("An error occured.");
    }
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
            }else{
                Warehouse.find({operator: user}).then(function (wh_list) {
                    res.render('dashboard', {
                        warehouses: wh_list,
                        user: user
                    });
                }).catch(function (err) {
                    console.error(err);
                    res.send("An error occured");
                })
            }
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

//Dashboard
router.get('/dashboard', function (req, res) {
    if(req.isAuthenticated()){
        const user = req.user;
        Warehouse.find({operator: user}).then(function(list){
            res.render('dashboard', {warehouses: list, user: user})
        }).catch(function (err) {
            throw err;
        });
    }else{
        res.send("An error occured.");
    }
});


exports.usersRouter = router;
exports.Users = Users;
// module.exports = router;
