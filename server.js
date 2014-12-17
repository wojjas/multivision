var express = require('express');
var passport = require('passport');
var mongo = require('mongoose');
var LocalStrategy = require('passport-local').Strategy;

//Choose environment:
//  On Windows: set NODE_ENV=dev  (or production)
//  On Heroku:
var env = process.env.NODE_ENV = process.env.NODE_ENV || 'dev';
var config = require('./server/config/config')[env];
var app = express();

//Configure:
require('./server/config/express')(app, config);
require('./server/config/mongoose')(config);

var Users = mongo.model('Users');

//Users.findOne({username:'dd'}).exec(function (err, user) {
//    if (user) {
//        console.log('found one user');
//    }
//    else {
//        console.log('didnt find any user');
//    }
//});

passport.use(new LocalStrategy(
    function(username, password, done){
        console.log('Looking for user: ' + username);

//        Users.findOne({username:username}).exec(function (err, user) {
//            if(user){
//                return done(null, user);
//            }
//            else{
//                return done(null, false);
//            }
//        })
    }
));

passport.serializeUser(function (user, done) {
    console.log('Serializing user: ');
    if(user){
        done(null, user._id);
    }
});
passport.deserializeUser(function (id, done) {
    console.log('Deserializing user: ');
    Users.findOne({_id:id}).exec(function (err, user) {
        if(user){
            return done(null, user);
        }
        else{
            return done(null, false);
        }
    })
})


require('./server/config/routes')(app);

app.listen(config.port);
console.log('Listening on port ' + config.port + '...');