var mongoose = require('mongoose');

console.log("Setting up connection to the DB...");
var db;
var db_uri = "mongodb://sharehouse:Share1Share1nsecurePWD@ds257851.mlab.com:57851/sharehouse";
var db_options = {
  useNewUrlParser: true
}
var connection = mongoose.connect(db, db_uri);
connection.then(function(_db){
  db = _db;
  return db;
}).catch(function(err){
  //No need to continue operation with no connection, send a SIGTERM signal, and log an error.
  console.error("Error connecting to the DB: ",err);
  process.exit(1);
});



module.exports = db;
