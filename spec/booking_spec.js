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
      },
      name: "Tema Port",
      size: 1000,
      price_per_sqm: 5,
      empty_size: 200
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


  it("Can compute the bill ammount ", function(){
    mongoose.connect("mongodb://localhost:27017/testing", {useNewUrlParser: true});
    //Add a warehouse
    var warehouse =  Warehouse.create({
      location: {
        type: "Point",
        coordinates: [-73.856077,40.848447]
      },
      name: "Tema Port",
      size: 1000,
      price_per_sqm: 5,
      empty_size: 200
    });
    warehouse.then(function(wh){
      var bill = support.compute_bill(wh, 3);
      expect(bill.bill).toBe(15);
    })
    .catch(function(err){
      throw err;
    });


  });

  it("Can post a booking", function(){
    mongoose.connect("mongodb://localhost:27017/testing", {useNewUrlParser: true});
    var warehouse =  Warehouse.create({
      location: {
        type: "Point",
        coordinates: [-73.856077,40.848447]
      },
      name: "Tema Port",
      size: 1000,
      price_per_sqm: 5,
      empty_size: 200
    });
    //
    var sp = new Date("2018-7-14");
    var ep = new Date("2018-10-13");
    warehouse.then(function(wh){
      var period = support.get_storage_period(sp, ep);
      expect(period).not.toBe(false);
      var bill = support.compute_bill(wh, period);
      expect(bill.bill).not.toBe(false);
      bill.starting = sp;
      bill.ending = ep;
      bill.warehouse = wh;
      var booking = support.post_booking(bill);
      expect(booking).toBe(true);
    })
  });


})
