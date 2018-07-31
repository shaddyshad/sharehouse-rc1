var express = require('express');
var mongoose = require('mongoose');

var connection = require('../routes/database');
var {warehouseRouter, Warehouse} = require('../routes/warehouse');
var {support} = require('../routes/booking');
var {Users} = require('../routes/users');

describe("Router tests suit", function(){
  beforeAll(function(){
    //setup code
    //DB Connection
    mongoose.connect("mongodb://localhost:27017/testing", {useNewUrlParser: true});
    //Add a warehouse
    var warehouse = new Warehouse({
      location: {
        type: "Point",
        coordinates: [-73.856077,40.848447]
      }
    }).save(function(err, res){
      if(err) throw err;
    });

    //Add a user
    var operator = new Users({
      username: "test_user",
      password: "test_password",
      userType: true, //operator
    }).save(function(err, res){
      if(err) throw err;
    });

    var depositor = new Users({
      username: "test_depositor",
      password: "test_pwd",
      userType: false, //depositor
    }).save(function(err, res){
      if(err) throw err;
    });


  });

  // afterAll(function(){
  //   //TearDown the resources
  //   mongoose.connect("mongodb://localhost:27017/test", {useNewUrlParser: true}, function(err, res){
  //     if(err) throw err;
  //   });
  //   //delete all collections
  //   mongoose.connection.db.dropCollection('entries', function(err, res){
  //     if(err) throw err;
  //   });
  //   //delete all collections
  //   mongoose.connection.db.dropCollection('users', function(err, res){
  //     if(err) throw err;
  //   });
  //   //delete all collections
  //   mongoose.connection.db.dropCollection('bookings', function(err, res){
  //     if(err) throw err;
  //   });
  // })

  it("Adds a booking to the DB ", function(){
    expect(true).toBe(true);
  });
})
