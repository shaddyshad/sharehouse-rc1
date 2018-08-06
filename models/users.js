var mongoose = require('mongoose');

var connection = require('../routes/database.js');

mongoose.connection = connection;

var userSchemaOptions = {
    collection: "users",
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at'},
};

var _schema = {
    username: String,
    email: String,
    password: String,
    user_type: String,
};
var UserSchema = mongoose.Schema(_schema, userSchemaOptions);
var Users = mongoose.model('users', UserSchema);

module.exports = Users;