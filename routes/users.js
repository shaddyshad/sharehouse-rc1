var express = require('express');
var mongoose = require('mongoose');

var router = express.Router();

var db;
var db_uri = "mongodb://sharehouse:Share1nsecurePWD@ds257851.mlab.com:57851/sharehouse";
var db_options = {
	useNewUrlParser: true
};
mongoose.connect(db_uri, db_options)
.then(function(_db){
	db = _db;
})
.catch(function(_err){
	console.error("[Users] - Connection failure ",_err);
	 process.exit(1);
 });

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

/*GET a specific user*/
router.get('/:username', function(req, res, next){
	var _username = req.param.username;
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
