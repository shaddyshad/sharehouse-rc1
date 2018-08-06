var mongoose = require('mongoose');

var _schemaOptions = {
    collections: "warehouses",
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
var warehouseSchema = mongoose.Schema(_schema, _schemaOptions);
var Warehouses = mongoose.model('warehouses', warehouseSchema);

module.exports = Warehouses;