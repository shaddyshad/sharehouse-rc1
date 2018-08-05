const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
let logger = require('morgan');
const passport = require('passport');
const flash = require('connect-flash');
const session = require('express-session');
const FileStore = require('session-file-store')(session);
const bcrypt = require('bcrypt');
const Users = require('./models/users');


require('dotenv').config();
const config = require('./config');

const indexRouter = require('./routes/index');
var {usersRouter} = require('./routes/users');
var {warehouseRouter} = require('./routes/warehouse');
var {bookingRouter} = require('./routes/booking');


const app = express();


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

require('./authentication').init(app);

app.use(session({
    secret: config.session.secret,
    resave: false,
    saveUninitialized: true,
    store: new FileStore()
}));



app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function (user, cb) {
    console.log("Inside serialize user code - with user ", user);
    cb(null, user._id)
});

passport.deserializeUser(function (username, cb) {
    findUser(username, cb)
});



app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(flash());

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/warehouses', warehouseRouter);
app.use('/bookings', bookingRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

//exports.app = app;

module.exports = app;
