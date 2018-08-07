const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
let logger = require('morgan');
const passport = require('passport');
const flash = require('connect-flash');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const mongoose = require('mongoose');


const Users = require('./models/users');
require('dotenv').config();
//configure hot reloading
const production = process.env.NODE_ENV === 'production';
if(!production){
    const chokidar = require('chokidar');
    const dirs = ['./routes', './public', './views'];
    var watcher = chokidar.watch(dirs);

    watcher.on('ready', function () {
        watcher.on('all', function () {
            dirs.forEach(function (dir) {
                console.log("Clearing "+ dir + " contents.");
                Object.keys(require.cache).forEach(function (key) {
                    if(RegExp(dir).test(key)) delete  require.cache[key];
                })
            })
        })
    })
}



const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

mongoose.connect('mongodb://localhost:27017/sharehouse', {useNewUrlParser: true});
require('./authentication').init(app);
require('./models');

mongoose.Promise = global.Promise;
const db = mongoose.connection;

app.use(session({
    secret: "letmepass",
    resave: false,
    saveUninitialized: true,
    store: new MongoStore({mongooseConnection: db})
}));

const indexRouter = require('./routes/index');
const warehouseRouter = require('./routes/warehouse');
const usersRouter = require('./routes/users');
const bookingRouter = require('./routes/booking');


app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function (user, cb) {
    cb(null, user._id)
});


passport.deserializeUser(function (id, cb) {
    Users.findOne({_id: id}).then(function (user) {
        return cb(null, user);
    }).catch(function (err) {
        return callback(err);
    });
});

app.use(flash());

app.use('/', indexRouter);
app.use('/warehouses', warehouseRouter);
app.use('/users', usersRouter);
app.use('/bookings', bookingRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

//exports.app = app;



module.exports = app;
