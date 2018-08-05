const express = require('express');
const mongoose = require('mongoose');
const connection = require('./database.js');
const uuid = require('uuid/v4');

const router = express.Router();

//Database setup
mongoose.connection = connection;

var {Warehouse} = require('../models');

//APIs
//GET a list of all warehouses
router.get('/', function(req, res, next){
  req.isAuthenticated() ? res.redirect('/users/dashboard') : res.redirect('/');
});


router.post('/', function(req, res){
  console.log(req.body);
    const wh = {
        location: req.body.location,
        name: req.body.name,
        area: req.body.area,
        empty: req.body.empty,
        price: req.body.price,
        operator: req.user,

    };
    const warehouse = Warehouse.create(wh);
    warehouse.then(function(wh){
      res.send("Added succesfully");
    })
        .catch(function(err){
          console.error(err);
          res.send("An error occured");
        });
});

//GET details about a single warehouse
router.get("/listings/id/:id", function(req, res, next){
    let id = req.params.id;
    if(!id){
    res.json({"status": "error", "message": "Cannot find the ID"});
  }


  Warehouse.findOne({_id: id}).then(
    function(wh){
        console.log("We have the warehouses now.");
      res.render('listing',{warehouse: wh});
    }
  ).catch(function(err){
    console.error("Get Details: ", err);
    res.json({"status": "error", "message": "Error retrieving record"});
  });
});



router.get('/listings', function (req, res) {
    res.render('listing');
});

router.get('/add', function (req, res) {
   res.render('add_warehouse');
});


exports.warehouseRouter = router;
// module.exports = router;
