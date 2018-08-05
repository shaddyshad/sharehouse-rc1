const passport = require('passport');
const bcrypt = require('bcrypt');
const LocalStrategy = require('passport-local').Strategy;

const authenticationMiddleware = require('./middleware');

const Users = require('../models');

function findUser (username, callback) {
    Users.findOne({username: username})
        .then(function(user){
            return callback(null, user)
        }).catch(function (err){
            return callback(null);
        });
}

passport.serializeUser(function (user, cb) {
    cb(null, user.username)
});

passport.deserializeUser(function (username, cb) {
    findUser(username, cb)
});

function initPassport () {
    passport.use(new LocalStrategy(
        (username, password, done) => {
            findUser(username, (err, user) => {
                if (err) {
                    return done(err)
                }

                // User not found
                if (!user) {
                    console.log('User not found');
                    return done(null, false)
                }

                // Always use hashed passwords and fixed time comparison
                bcrypt.compare(password, user.passwordHash, (err, isValid) => {
                    if (err) {
                        return done(err)
                    }
                    if (!isValid) {
                        return done(null, false)
                    }
                    return done(null, user)
                })
            })
        }
    ));

    passport.authenticationMiddleware = authenticationMiddleware
}

module.exports = initPassport;