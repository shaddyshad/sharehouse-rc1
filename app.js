//server setup file
let express = require('express');
let mongoose = require('mongoose');
let passport = require('passport');
let LocalStrategy = require('passport-local').Strategy;

//depositor ops
let dp_ops = require('./src/users/depositors.js');

let app = express();

//some global variables definitions
const client_dir = __dirname+'/assets/public_html';

//START DB connection
var mongoDB = 'mongodb://sharehouse:Share1nsecurePWD@ds257851.mlab.com:57851/sharehouse';
mongoose.connect(mongoDB);
//Get mongoose to use global promise library
mongoose.Promise = global.Promise;
//Get the default connection
var db = mongoose.connection;
//Bind connection to error event(to get notified of connection errors)
db.on('error', console.error.bind(console, "MongoDB connection error"));
//END DB connection

//START Data schema definitions
var Schema = mongoose.Schema;

var DepositorSchema = new Schema({
  fist_name: String,
  last_name: String,
  email: String,
  password: String,
  creation_date: { type: Date, default: Date.now }
});

var WHOperatorSchema = new Schema({
  first_name: String,
  last_name: String,
  email: String,
  phone_number: String,
  password: String,
  creation_date: { type: Date, default: Date.now },
});

var WarehouseSchema = new Schema({
  name: String,
  location: String,
  wh_operator: Schema.Types.ObjectId,
  total_size: { type: Number, min: 1, required: true },
  free_space: Number
});

var GoodsSchema = new Schema({
  name: String,
  depositor: Schema.Types.ObjectId,
  type: String,
  warehouse: Schema.Types.ObjectId,
  start_date: Date,
  period: Number
});

//compile all the schemas
var Depositor = mongoose.model('Depositor', DepositorSchema);
var WHOperator = mongoose.model('WHOperator', WHOperatorSchema);
var Warehouse = mongoose.model('Warehouse', WarehouseSchema);
var Goods = mongoose.model('Goods', GoodsSchema);
//end compilation
//END Data schema definitions

//START root-state transitions
//different handler will be found in different src/ directories
app.use(express.json());

app.get('/home', function(req, res, next){
  //just call the root'/''
  res.redirect("/")
});

app.get('/', function(req, res){
  //send the index file and test
  res.sendFile('index.html', {root: client_dir});
});


app.post('/depositor_signup', dp_ops.dp_signup);

//END root-state transitions

app.get('/request_wh', function(req, res){
  //first, serve the warehouse_request.html page
  res.sendFile('warehouse_request.html', {root: client_dir});
});

app.post('/request_wh', function(req, res){
  //somebody is looking for a warehouse

})

app.post('/login', passport.authenticate('local', {
  successRedirect: '/', failureRedirect: '/login', failureFlash: true
}))

//
let port = process.env.PORT || 3000
let server = app.listen(port);
