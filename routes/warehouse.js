var express = require('express');
var mongoose = require('mongoose');
var connection = require('./database.js')

var router = express.Router();

//Database setup
mongoose.connection = connection;

 var _schemaOptions = {
   typeKey: '$type',
   // timestamps: {createdAt: 'created_at', updatedAt: 'updated_at'},
   // collection: 'entries'
 }

 var _schema = {
   location :{
     type: String,
     coordinates:[]
   },
   name: {'$type': String},
   size: Number,
   price_per_sqm: Number,
   empty_size: Number
 }

var warehouseSchema = new mongoose.Schema(_schema, _schemaOptions);
/*Including distance in the query select fields using a virtual field.
  We don't want the distance to show, since it's a relative measure and there is not any absolute point of reference we can use, but distance plays a critical
  business role when it comes to finding warehouse. Ordering the output of the query by distance, makes perfect business sense.
*/



//Compiled model
var Warehouse = mongoose.model(process.env.DEV_WAREHOUSE_COLLECTION, warehouseSchema);



//APIs
//GET a list of all warehouses
router.get('/', function(req, res, next){
  //TODO add authorization checks
  //Restrict to !user.user_type and redirect to dashboard if user.user_type
  var _warehouse = Warehouse.find({});
  _warehouse.then(function(warehouse){
    res.json(warehouse);
  })
  .catch(function(_err){
    console.error("Error getting warehouse ", _err);
    res.json({"status":"error", "message":"Error fetching warehouses"});
  })
});


router.post('/', function(req, res, next){
  //TODO add authorization checks

  var warehouseForm = req.body;
  console.log(warehouseForm);
  //Assume warehouse has the appropriate data FIXME
  //Look for location key in the form
  // if(!warehouseForm.hasOwnProperty('location')){ //FIXME implement has_key
  //   res.json({"status":"error", "message":"Expected location"});
  // }
  var _warehouseLocation = warehouseForm.location; //ignore all other fields
  let sep = has_sep_comma(_warehouseLocation) ? "," : " "; //check the separator in the parameter
  //Array.prototype.slice()
  _warehouseLocation = normalizeLocation(_warehouseLocation, sep);
  if(_warehouseLocation.length !== 2){
    res.json({"status":"error", "message":"Invalid coordinates"});
  }
  var loc = {
    type: "Point",
    coordinates: _warehouseLocation
  }
  //Process the other fiels
  var size = warehouseForm.size;
  var empty = warehouseForm.empty;
  var ppsqm = warehouseForm.price;
  var name = warehouseForm.name;

  if(empty > size){
    res.json({"status":"error", "message":"Invalid empty size"});
  }

  var _schema = {
    location: loc,
    name: name,
    size: size,
    empty_size: empty,
    price_per_sqm: ppsqm
  };
  var warehouse = new Warehouse(_schema);
  warehouse.save(function(err, wh){
    if(err){
      console.error("Error adding warehouse.");
      res.json({"status":"error", "message":"Error adding warehouse"});
    }
    res.json({"status": "success", "message": "Succesfully added warehouse"});
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
  var sep = has_sep_comma(loc) ? ",":" ";
  var _loc = normalizeLocation(loc, sep);
  var _compareLoc = {
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
      res.sendStatus(300);
    });

});

//GET details about a single warehouse
router.get("/retrieve/:id", function(req, res, next){
  var id = req.params.id;
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



exports.warehouseRouter = router;
exports.Warehouse = Warehouse;
// module.exports = router;
