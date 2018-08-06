"use strict";

var config = {};

config.session = {
    secret: process.env.STORE_SECRET
};

module.exports = config;