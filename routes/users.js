var express = require('express');
var mongoose = require('mongoose');
var connection = require('./database.js');

var router = express.Router();

mongoose.connection = connection;

var userSchemaOptions = {
	collection: "users",
	timestamps: { createdAt: 'created_at', updatedAt: 'updated_at'},
};

var _schema = {
	username: String,
	password: String,
	user_type: Boolean, //0 for depositor, 1 for operator
};
var UserSchema = mongoose.Schema(_schema, userSchemaOptions);
var Users = mongoose.model('users', UserSchema);


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
	var _type = userType == "operator"?true:false;
	var _user = Users.create({username: req.body.username, password: req.body.password, user_type: _type});
	_user.then(function(user){
		console.log("Added user: ", user);
		res.json({"status": "200", "message": "Added  succesfully"});
	}).catch(function(err){
		console.error("Error adding user ",err);
		res.json({"status":"1", "message": "Failed to add object to the db."});
	});
})

function sanitize_username(username){
	var nameReg = new RegExp(/([A-Za-z]){4,10}$/);
	return (username.match(nameReg) !== null);
}

function sanitize_email(email){
	mail = new RegExp(/[A-Za-z._]+@[A-Za-z]+\.[A-Za-z]{3,}$/);
	return(email.match(mailReg) !== null);
}

function verify_password(pwd1, pwd2){
	//Will improve with hashing, but right now, act as a stub for a raw password
	return pwd1 == pwd2;
}

//Login functionality
router.post('/login', function(req, res, next){
	// console.log("Login");
	var login_form = req.body;
	if(!login_form){
		res.json({"status":"error", "message":"Could not login"});
	}
	if(login_form.username === undefined || login_form.password === undefined){
		res.json({"status":"error", "message":"Empty username or password"});
	}
	// console.log("Searching for user", login_form.password);
	if(sanitize_username(login_form.username)){
		// console.log("Sanitized");
		Users.findOne({username: login_form.username}).then(function(user){
			if(verify_password(user.password, login_form.password)){
				//Authenticated user
				res.send("Authenticated");

			}else{
				res.send(`Unauthenticated ${login_form.password}, ${_user.password}`);
			}
		}).catch(function(err){
			console.error(err);
			res.json({"status":"error", "message": "Invalid username/password combination."});
		})
	}else{
		//malicious data?
		res.json({"status":"error", "message": "Invalid username"});
	}
})

/*GET a specific user*/
router.get('/retrieve/', function(req, res, next){
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




module.exports = router;
