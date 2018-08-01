var mongoose = require('mongoose');

console.log("Setting up connection to the DB...");
var db;
var db_uri;
if(process.env.DEBUG){  //use a db based on environment
  db_uri = "mongodb://localhost:27017/geo";
}else{
  var _user = process.env.DB_USER;
  var _pasword = process.env.DB_PWD;
  var _host = process.env.DB_HOST;
  var _db = 'sharehouse';
  db_uri = `mongodb://${_user}:${_pasword}@${_host}/${_db}`;
}

var db_options = {
  useNewUrlParser: true
}
var connection = mongoose.connect(db_uri, db_options);
connection.then(function(_db){
  db = _db;
  console.log("Ready...");
  return db;
}).catch(function(err){
  //No need to continue operation with no connection, send a SIGTERM signal, and log an error.
  console.error("Error connecting to the DB: ",err);
  process.exit(1);
});



module.exports = db;
