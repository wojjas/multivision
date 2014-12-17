var express = require('express');
var stylus = require('stylus');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var passport = require('passport');
var bodyParser = require('body-parser');

module.exports = function (app, config) {

    function compile(str, path) {
        return stylus(str).set('filename', path);
    }
    //app.set('views', './server/views');
    app.set('views', config.rootPath + '/server/views');
    app.set('view engine', 'jade');
    app.use(cookieParser());
    app.use(bodyParser.urlencoded({
        extended: true
    }));
    app.use(bodyParser.json());
    app.use(session({secret: 'multi vision unicorns',
        saveUninitialized: true,
        resave: true}));
    app.use(passport.initialize());
    app.use(passport.session());
    app.use(stylus.middleware(
        {
            src: config.rootPath + '/public',
            compile: compile
        }
    ));
    app.use(express.static(config.rootPath + '/public'));
}
