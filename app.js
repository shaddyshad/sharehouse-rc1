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
mongoose.connect(mongoDB, {useNewUrlParser: true});
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
  first_name: {type: String, trim: true, required: true},
  last_name: {type: String, trim: true, required: true},
  email: String,
  password: String,
  creation_date: { type: Date, default: Date.now }
});

var WHOperatorSchema = new Schema({
  first_name: {type: String, trim: true},
  last_name: {type: String, trim: true},
  email: String,
  phone_number: String,
  password: String,
  creation_date: { type: Date, default: Date.now },
});

var WarehouseSchema = new Schema({
  name: String,
  location: {type: {type: String}, coordinates: [Number]},
  wh_operator: Schema.Types.ObjectId,
  total_size: { type: Number, min: 1, required: true },
  available_space: {type: Number, min: 0}
});

var GoodsSchema = new Schema({
  name: String,
  depositor: Schema.Types.ObjectId,
  type: {type: String, enum: ['Petroleum', 'Electronics', 'Cereals', 'Other']},
  warehouse: Schema.Types.ObjectId,
  start_date: {type: Date,default: Date.now},
  period: {type: Number, min: 1}
});

//compile all the schemas
var Depositor = mongoose.model('Depositor', DepositorSchema);
var WHOperator = mongoose.model('WHOperator', WHOperatorSchema);
var Warehouse = mongoose.model('Warehouse', WarehouseSchema);
var Goods = mongoose.model('Goods', GoodsSchema);
//end compilation
//END Data schema definitions

app.get('/depositor', function(req, res){
  //create a depositor instance and save it
  var depositor = new Depositor({first_name: 'Shad', last_name: 'Shaddy', password: 'PWD', email: 'EMAIl'});

  //save the instance, passing a callback
  depositor.save(function(err){
    if(err){
      console.log(err);
      //TODO error and retry receiving the form
      res.send("Could not save to DB");
    }
    //TODO Succesfully added a depositor, do the next thing
    res.send("Record saved to DB");
  })
});

app.get('/warehouse', function(req, res){
  //create a warehouse
  var warehouse = new Warehouse({name: "Tema", location: {type:"Point", coordinates: [12.12, 13.45]},total_size: 1000, available: 200});

  warehouse.save(function(err){
    if(err){
      console.log(err);
      //TODO retry adding the warehouse
      res.send("Could not save warehouse to DB");
    }
    //TODO succesfully added a warehouse
    res.send("Warehouse added.");
  })
});

app.get('/operator', function(req, res){
  //create an operator
  var operator = new WHOperator({first_name: "Op", last_name:"Op2", email: "Email"});

  //save and pass a callback
  operator.save(function(err){
    if(err){
      console.log(err);
      //TODO retry rebuilding an operator
      res.send("Could not save operator to the DB");
    }
    res.send("Operator added.");
  })
});

app.get('/goods', function(req, res){
  //create a wh, depositor, and goods and allocate it
  var wh = new Warehouse({name: "Tema", location: {type:"Point", coordinates: [12.123, 13.453]},total_size: 1000, available: 200});
  var dep = new Depositor({first_name: 'Shad', last_name: 'Shaddys', password: 'PWsdsD', email: 'EMAIasdl'});
  var goods = new Goods({name: "Goods1", depositor: dep, type: "Electronics", warehouse: wh, period: 2});

  goods.save(function(err){
    //saved goods
    if(err){
      //TODO something happened while we were adding the goods
      console.log("Error adding goods: ", err);
      res.send("Error adding goods to warehouse");
    }
    res.send("Goods added succesfully");
  })
})

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
