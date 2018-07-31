var express = require('express');
var mongoose = require('mongoose');
var connection = require('./database');

var router = express.Router();

mongoose.connection = connection;

var _schema = {
  bill: Number,
  period: Number,
  autoComputed: Boolean,     //Was the period auto computed, or provided... Just a flexibility feature
};
var _options = {
  useNewUrlParser: true
};

var Bookings = mongoose.model('bookings', new mongoose.Schema(_schema, _options));

router.get('/', function(req, res, next){
  Bookings.find({})
    .then(function(bookings){
      res.json(JSON.stringify(bookings));
    })
    .catch(function(err){
      console.error("Error retrieving bills: ",err);
      res.json({"status":"error", "message":"Error retrieving bills."});
    });

});


//Post a booking to the DB
function post_booking(booking){
  if(!booking){
    console.error("Invalid booking");
    return false;
  }
  let _bill = parseFloat(booking.bill);
  if(Number.isNaN(bill)){
    console.log("Invalid bill");
    return false;
  }
  let _autoComputed = false;
  let _period = parseInt(booking.period);
  if(Number.isNaN(_period)){
    console.log("Invalid bill");
    //assume a period of one month, and indicate
    _period = 1;
    _autoComputed = true;
  }

  //process other fiels
  let _booking = Bookings.create({bill: _bill, autoComputed: _autoComputed, period: _period});

  _booking.then(function(bill){
    return true;
  }).catch(function(err){
    console.error(err);
    return false;
  })

}

//Return a booking, that can be added to the DB
function compute_bill(period, warehouse){
  //early sanity
  if(!warehouse){
    return false;
  }
  //compute the bill required to be paid for period in the warehouse
  period = parseInt(period);
  let _autoComputed = false;
  if(Number.isNaN(period)){
    period = 1;     //calculate for a period of a month if no period is provided
    _autoComputed = true;
  }

  //Get the ppsqm and compute the bill
  let ppsqm = parseFloat(warehouse.price);
  if(Number.isNaN(ppsqm)){
    return false;
  }

  let _bill = ppsqm * period; //safely assume the equation won't be a NaN
  let booking = {
    bill: _bill,
    period: period,
    autoComputed: _autoComputed
  };

  return booking;

}

//Date functions
/*
A depositor provides the date of start, we use it to match warehouse that are available, and also compute the bill.
*/

router.post('/', function(req, res, next){
  var bill = req.body;
  if(!bill){
    console.log("Invalid bill.");
    res.json({"status": "error", "message":"Invalid bill"});
  }
})

module.exports = router;
