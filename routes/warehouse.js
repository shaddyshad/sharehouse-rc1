var express = require('express');
var mongoose = require('mongoose');

var router = express.Router();

//Database setup
/*
* The module opens a connection with the database server at the warehouse db collection
*/
var db;
var db_uri = "mongodb://sharehouse:Share1nsecurePWD@ds257851.mlab.com:57851/sharehouse";
var db_options = {
	useNewUrlParser: true
};

mongoose.connect(db_uri, db_options)
.then(function(_db){
	db = _db;
})
.catch(function(_err){
	console.error("[Users] - Connection failure ",_err);
	 process.exit(1);
 });


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

var warehouse = mongoose.model('warehouse', warehouseSchema);

//APIs
//GET a list of all warehouses
router.get('/', function(req, res, next){
  var _warehouse = warehouse.find({});
  _warehouse.then(function(warehouse){
    res.json(JSON.stringify(warehouse));
  })
  .catch(function(_err){
    console.error("Error getting warehouse ", _err);
    res.json({"status":"error", "message":"Error fetching warehouses"});
  })
});


module.exports = router;
