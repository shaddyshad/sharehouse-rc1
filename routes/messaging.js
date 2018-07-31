var express = require('express');
var mongoose = require('mongoose');

var connection = require('./database');
var {Users} = require('./users');

mongoose.connection = connection;
var Schema = mongoose.Schema;

//setup
var _schema = {
  from: {type: Schema.Types.ObjectId, ref: 'users'},
  to: {type: Schema.Types.ObjectId, ref: 'users' },
  subject: String,
  message: String
}

var Messages = mongoose.model('messages', new Schema(_schema));

//user - a user object or user id
function retrieve_inbox(user){
  //retrieve all inbox messages belonging to the user
  if(!user){
    return false;
  }

  if(typeof user === 'object'){
    //retrieve for the user._id
    Messages.find({to: user}).then(function(records){
      return records;
    }).catch(function(err){throw err;});

  }else if(typeof user == 'string'){
    //fetch from db
    var _query = Users.findOne({_id: user});
    _query.then(function(_user){
      //extract the messages
      var _messages = Messages.find({to: _user}).then(function(records){
        return records;
      }).catch(function(err) {
        throw err;
      })
    })
  }else{
    return false;
  }
}

//retrieve the sentbox
function retrieve_sentbox(user){
  //ensure the user is an object
  if(!user){
    return false;
  }

  Messages.find({from: user}).then(function(records){
    return records;
  }).catch(function(err){
    throw err;
  });
}

var router = express.Router();

var test_support = {
  retrieve_inbox
}

exports.messagingRouter = router;
exports.Messages = Messages;
