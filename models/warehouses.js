var mongoose = require('mongoose');
var connection = require('../routes/database.js');

mongoose.connection = connection;

var _schemaOptions = {
    typeKey: '$type',
    // timestamps: {createdAt: 'created_at', updatedAt: 'updated_at'},
    // collection: 'entries'
};

var _schema = {
    location :{
        type: String,
        coordinates:[]
    },
    name: {'$type': String},
    size: Number,
    price_per_sqm: Number,
    empty_size: Number,
    operator: {type: mongoose.Schema.Types.ObjectId}
};

var warehouseSchema = new mongoose.Schema(_schema, _schemaOptions);
/*Including distance in the query select fields using a virtual field.
  We don't want the distance to show, since it's a relative measure and there is not any absolute point of reference we can use, but distance plays a critical
  business role when it comes to finding warehouse. Ordering the output of the query by distance, makes perfect business sense.
*/



//Compiled model
var Warehouse = mongoose.model(process.env.DEV_WAREHOUSE_COLLECTION, warehouseSchema);


module.exports = Warehouse;