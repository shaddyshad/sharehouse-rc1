const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const bcrypt = require('bcrypt');
const querystring = require('querystring');

const connection = require('./database.js');
var {Users, Warehouse} = require('../models');


const router = express.Router();

mongoose.connection = connection;

/* GET a list of all users. */
router.get('/', function(req, res, next) {
    req.isAuthenticated() ? res.redirect(req.baseUrl + '/dashboard') : res.redirect('/error');
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
		res.redirect(req.baseUrl + '/login')
	}).catch(function(err){
		console.error(err);
		res.redirect(req.baseUrl + '/register');
	});
});

//Login functionality
router.post('/login', function (req, res, next) {
    passport.authenticate('local', (err, user, info) => {
        if(err) console.error(err);

        req.login(user, (err) => {
            err ? res.send("Not authenticated. ") : res.redirect(req.baseUrl + '/dashboard');
        });
    })(req, res, next);
});

router.get('/login', function (req, res) {
    req.isAuthenticated() ? res.redirect(req.baseUrl + '/dashboard') : res.render('login');
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
            res.send("Error");
            console.log(err);
        });
    }else{
        //Not authenticated, just login
        res.render('dashboard', {
            warehouses: [
                {
                    name: "TemaWHQ2",
                    location: "Tema",
                    empty: 220,
                    area: 2500,
                    price: 6,
                }
            ],
            user: {
                username: "Tema warehouse operators",
                email: "temahq@email.com",
                user_type: "Warehose operator"

            }
        })
    }
});


exports.usersRouter = router;
exports.Users = Users;
// module.exports = router;
