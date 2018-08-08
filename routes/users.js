const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const bcrypt = require('bcrypt');

var Warehouse = mongoose.model('warehouses');
var Users = mongoose.model('users');

const router = express.Router();

/* GET a list of all users. */
router.get('/', function (req, res, next)
{
   req.isAuthenticated() ? res.redirect(req.baseUrl + '/dashboard') : res.redirect('/login');
});

/*POST a user to the database*/
router.post('/', function (req, res, next)
{
   const _userForm = req.body;

   //Generate the has
   const saltRounds = 10;
   const _password = _userForm.password;
   const salt = bcrypt.genSaltSync(saltRounds);
   const _passwordHash = bcrypt.hashSync(_password, salt);

   //create a user object
   const user = {
      first_name : req.body.first_name,
      last_name  : req.body.last_name,
      username   : req.body.username || "", //FIXME no form input for it now
      email      : req.body.email,
      password   : _passwordHash,
      user_type  : req.body.type,
      phone      : req.body.phone || ""
   };

   const _user = Users.create(user);

   _user.then(function (user)
              {
                 //send mail confirmation
                 res.redirect(req.baseUrl + '/login')
              }).catch(function (err)
                       {
                          console.error(err);
                          res.redirect(req.baseUrl + '/register');
                       });
});

//Login functionality
router.post('/login', function (req, res, next)
{
   passport.authenticate('local', (err, user, info) =>
   {
      if (err)
      {
         console.error(err);
      }

      req.login(user, (err) =>
      {
         //FIXME DO NOT
         if (req.user.user_type === "operator")
         {
            res.redirect(req.baseUrl + '/dashboard');
         }
         else
         { //TODO make the depositor route and redirect them appropriately
            res.redirect(req.baseUrl + '/home')
         }
      });
   })(req, res, next);
});

router.get('/login', function (req, res)
{
   req.isAuthenticated() ? res.redirect(req.baseUrl + '/dashboard') : res.render('login');
});

//Register functionality
router.get('/register', function (req, res)
{
   res.render('register', {user : req.user});
});

//Operator Home (Dashboard)
router.get('/dashboard', function (req, res)
{
   if (req.isAuthenticated())
   {
      const user = req.user;
      console.log(user, "req user");
      Warehouse.find({ operator : user }).then(function (list)
                                               {
                                                  res.render('operator-dashboard', { warehouses : list, user : user })
                                               }).catch(function (err)
                                                        {
                                                           res.send("Error");
                                                           //console.log(err);
                                                        });
   }
   else
   {
      //Not authenticated, just login
      res.render('dashboard', {
         warehouses : [
            {
               name     : "TemaWHQ2",
               location : "Tema",
               empty    : 220,
               area     : 2500,
               price    : 6,
            }
         ],
         user       : {
            username  : "Tema warehouse operators",
            email     : "temahq@email.com",
            user_type : "Warehose operator"

         }
      })
   }
});

//Depositor Dashboard
router.get('/home', function (req, res)
{

   res.render('home', {user : req.user});
});

module.exports = router;
