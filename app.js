//server setup
let express = require('express');

let app = express();
//server code goes here
app.get('/', function(req, res){
  //serve the home page 
  res.send("Hello world!");
})

//
let server = app.listen(3000, function(){

});
