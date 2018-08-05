var mongoose = require('mongoose');

var connection = require('../routes/database.js');

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

module.exports = Users;