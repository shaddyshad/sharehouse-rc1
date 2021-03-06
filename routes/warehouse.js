const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

var Warehouses = mongoose.model('warehouses');

//APIs
//GET a list of all Warehouses
router.get('/', function(req, res, next){
  req.isAuthenticated() ? res.redirect('/users/dashboard') : res.redirect('/');
});


router.post('/', function(req, res){
  console.log(req.body);
    const wh = {
        location: req.body.location,
        name: req.body.name,
        area: req.body.area,
        empty: req.body.empty,
        price: req.body.price,
        operator: req.user,

    };
    const Warehouses = Warehouses.create(wh);
    Warehouses.then(function(wh){
      res.send("Added succesfully");
    })
        .catch(function(err){
          console.error(err);
          res.send("An error occured");
        });
});

router.get('/listings/id/:id', function (req, res) {
    const id = req.params.id;
    console.log(id);

    Warehouses.findOne({_id: id}).then(function (wh) {
        res.render('listing', {Warehouses: wh});
    }).catch(function (err) {
        throw err;
    });
});

router.get('/add', function (req, res) {
   res.render('add_warehouse');
});

router.get('/manage', function(req, res){
    res.render('listing', {
        Warehouses: {
            name: "TemaWHQ2",
            location: "Tema",
            empty: 220,
            area: 2500,
            price: 6,
        }
    })
});

router.get('/store', function(req, res){
    res.render('storage', {
        any:
            {
                name: "Mr Kamau",
                start: "3rd Aug 2018",
                end: "5th Sept 2018",
                goods: "Electronics",
                notes: "Handle with care. Delicate goods",
                rent: 30
            }

    })
});


// exports.WarehousesRouter = router;
module.exports = router;
