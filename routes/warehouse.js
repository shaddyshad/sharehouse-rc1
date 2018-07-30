var express = require('express');
var mongoose = require('mongoose');
var connection = require('./database.js')

var router = express.Router();

//Database setup
mongoose.connection = connection;

 var _schemaOptions = {
   typeKey: '$type',
   timestamps: {createdAt: 'created_at', updatedAt: 'updated_at'},
   collection: 'warehouse'
 }

 var _schema = {
   location :{
     type: String,
     coordinates:[Number]
   },
 }

var warehouseSchema = new mongoose.Schema(_schema, _schemaOptions);
/*Including distance in the query select fields using a virtual field.
  We don't want the distance to show, since it's a relative measure and there is not any absolute point of reference we can use, but distance plays a critical
  business role when it comes to finding warehouse. Ordering the output of the query by distance, makes perfect business sense.

*/

//Compiled model
var Warehouse = mongoose.model('warehouse', warehouseSchema);

//APIs
//GET a list of all warehouses
router.get('/', function(req, res, next){
  //TODO add authorization checks
  //Restrict to !user.user_type and redirect to dashboard if user.user_type
  var _warehouse = Warehouse.find({});
  _warehouse.then(function(warehouse){
    res.json(JSON.stringify(warehouse));
  })
  .catch(function(_err){
    console.error("Error getting warehouse ", _err);
    res.json({"status":"error", "message":"Error fetching warehouses"});
  })
});

router.post('/', function(req, res, next){
  //TODO add authorization checks

  var warehouseForm = req.body;
  //Assume warehouse has the appropriate data FIXME
  //Look for location key in the form
  if(!warehouse.has_key('location'){ //FIXME implement has_key
    res.json("status":"error", "message":"Expected location");
  })
  var _warehouseLocation = warehouseForm.location; //ignore all other fields
  //Array.prototype.slice()
  _warehouseLocation = Array.prototype.slice(_warehouseLocation); //FIXME slice the array well
  if(_warehouse.length !== 2){
    res.json({"status":"error", "message":"Invalid coordinates"});
  }
  var loc = {
    type: "Point",
    coordinates: _warehouseLocation
  }
  var warehouse = new Warehouse(loc);
  warehouse.save(function(err, wh){
    if(err){
      console.error("Error adding warehouse.");
      res.json({"status":"error", "message":"Error adding warehouse"});
    }
    res.json({"status": "success", "message": "Succesfully added warehouse"});
  });
});

router.get('/search/:loc', function(req, res, next){
  //Invoked when search by location occurs
  res.send("Working on it.");
})


module.exports = router;
