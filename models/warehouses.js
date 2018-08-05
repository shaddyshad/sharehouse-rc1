var mongoose = require('mongoose');
var connection = require('../routes/database.js');

mongoose.connection = connection;

var _schemaOptions = {
    timestamps: {createdAt: 'created_at', updatedAt: 'updated_at'},
};
var _schema = {
    location: String,
    name: String,
    area: Number,
    empty: Number,
    price: Number,
    operator: {type: mongoose.Schema.Types.ObjectId}
};
var warehouseSchema = new mongoose.Schema(_schema, _schemaOptions);
var Warehouse = mongoose.model(process.env.DEV_WAREHOUSE_COLLECTION, warehouseSchema);

module.exports = Warehouse;