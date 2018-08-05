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
  //TODO add authorization checks
  //Restrict to !user.user_type and redirect to dashboard if user.user_type
    const _warehouse = Warehouse.find({});
    _warehouse.then(function(warehouse){
    // res.json(warehouse);
        res.send(`Id: ${req.sessionID}`)
  })
  .catch(function(_err){
    console.error("Error getting warehouse ", _err);
    res.json({"status":"error", "message":"Error fetching warehouses"});
  })
});


router.post('/', function(req, res){
  console.log(req.body);
    const wh = {
        location: req.body.location,
        name: req.body.name,
        area: req.body.area,
        empty: req.body.empty,
        price: req.body.price,

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

//Determine what type of separator that the location data has
function has_sep_comma(loc){
  if(!loc){
    return null;
  }
  return (loc.match(",") !== null);
}

//Normalize location.
//Assume the location in an arr or a string of values, return a parsed array of values
function normalizeLocation(loc, sep){
  let ret = Array();
  //let _sep = has_sep_comma(loc) ? "," : " ";  //assume default to be whitespace
  let _loc = loc.split(sep);
  _loc.forEach(l => {
    l = l.trim();
    console.log(l);
    ret.push(parseFloat(l));
  });
  return ret;
}

// //Get all warehouses in the range 5KM from point loc
// function get_all_in_range(loc){
//   const allowed_range = 500000; //5 km
//   //prepare the location
//   var sep = has_sep_comma(loc) ? ",":" ";
//   var _loc = normalizeLocation(loc, sep);
//   var _compareLoc = {
//     type: "Point",
//     coordinates: _loc
//   };
//   // console.log("BIIIIIIIG ",_compareLoc);
//
//   Warehouse.find()
//     .where('location')
//     .near({
//       center: _compareLoc,
//       maxDistance: allowed_range,
//       spherical: true
//     }).then(function(records){
//       return records;
//     }).catch(function(err){
//       throw err;
//     });
// }

router.get("/search/:location", function(req, res, next){
  let loc = String(req.params.location);
  const allowed_range = 500000; //5 km
  //prepare the location
    const sep = has_sep_comma(loc) ? "," : " ";
    const _loc = normalizeLocation(loc, sep);
    const _compareLoc = {
        type: "Point",
        coordinates: _loc
    };
    // console.log("BIIIIIIIG ",_compareLoc);
  Warehouse.find()
    .where('location')
    .near({
      center: _compareLoc,
      maxDistance: allowed_range,
      spherical: true
    }).then(function(records){
      res.json(records);
    }).catch(function(err){
      throw err;
    });

});

//GET details about a single warehouse
router.get("/retrieve/:id", function(req, res, next){
    let id = req.params.id;
    if(!id){
    res.json({"status": "error", "message": "Cannot find the ID"});
  }
  Warehouse.find({_id: id}).then(
    function(warehouse){
      res.json(warehouse);
    }
  ).catch(function(err){
    console.error("Get Details: ", err);
    res.json({"status": "error", "message": "Error retrieving record"});
  });
});

router.get('/listings/id/:id', function (req, res) {
    res.render('listing');
});

router.get('/listings', function (req, res) {
    res.render('listing');
});

router.get('/add', function (req, res) {
   res.render('add_warehouse');
});


exports.warehouseRouter = router;
// module.exports = router;
