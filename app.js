//server setup file
let express = require('express');

let app = express();
//server code goes here

//database connection setup
let MongoClient = require('mongodb').MongoClient;

MongoClient.connect("mongodb://localhost:20717/exampleDB",{auto_reconnect: true, poolSize: 10}, function(err, db){
  if(!err){
    console.log("We are connected.");
    //export db to be used for subsequen connections
  }
})

//some global variables
const client_dir = __dirname+'/assets/public_html';


/* Execute this middleware anytime a get request mounted at `/`(root) is received
* this will work for all requests to the index.
*/
//
// app.get('/', function(req, res){
//   //The root is interpreted differently based on whether it's an anonymous request or a request from an authenticated user.
//
//   //if authenticated, call the next middleware to handle the profile pages
//   if(req.authenticated){
//     next();
//   }else{
//   // else, show the root page(index page)
//
//   res.send("Hello world!");
// },//this callback is chained at the authentication check, it will handle displaying of
// //different profile pages based on user type
// );

app.get('/request_wh', function(req, res){
  //first, serve the warehouse_request.html page
  res.sendFile('warehouse_request.html', {root: client_dir});
})

//
let port = process.env.PORT || 3000
let server = app.listen(port);
