var express = require('express');
var mongoose = require('mongoose');

var connection = require('../routes/database');
// var {warehouseRouter, Warehouse} = require('../routes/warehouse');
// var {support} = require('../routes/booking');
var {Users} = require('../routes/users');
var {Messages, test_support} = require('../routes/messaging');

describe("Messaging test suite", function(){
  //Given a user and a few messages addressed to user, make sure we can retrieve all messages
  it("retrieves all messages", function(){
    var user =new Users({
      username: "test_user",
      password: "test_pwd",
      userType: 0 //whoever
    });

    var dep = new Users({
      username: "test_sender",
      password: "test_password",
      userType: 1 //whoever the f
    })
    user.save().then(function(_user){
      //Create a few messages
      dep.save().then(function(_dep){
        var in1 = Messages({
          from: _user,
          to: _dep,
          subject: "A test subject",
          message: "Test message"
        });

        var in2 = Messages({
          from: _user,
          to: _dep,
          subject: "Test subject 2",
          message: "Test message 2"
        });

        in1.save().then(function(_msg){
          in2.save().then(function(_msg){
            //fetch them
            var messages = test_support.retrieve_inbox(_dep);
            expect(messages).not.toBe(false);
            expect(messages.length).toBe(2);
          })
        })
      });
    }).catch(function(err){
      throw err;
    });
  });

  it("Retrieves all the sent boxes", function(){
    var user =new Users({
      username: "test_user",
      password: "test_pwd",
      userType: 0 //whoever
    });

    var dep = new Users({
      username: "test_sender",
      password: "test_password",
      userType: 1 //whoever the f
    })
    user.save().then(function(_user){
      //Create a few messages
      dep.save().then(function(_dep){
        var in1 = Messages({
          from: _user,
          to: _dep,
          subject: "A test subject",
          message: "Test message"
        });

        var in2 = Messages({
          from: _user,
          to: _dep,
          subject: "Test subject 2",
          message: "Test message 2"
        });

        in1.save().then(function(_msg){
          in2.save().then(function(_msg){
            //fetch them
            var messages = test_support.retrieve_sentbox(_dep);
            expect(messages).not.toBe(false);
            expect(messages.length).toBe(2);
          })
        })
      });
    }).catch(function(err){
      throw err;
    });
  });
});
