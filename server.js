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

var User = mongo.model('User');
passport.use(new LocalStrategy(
    function(username, password, done){
        User.findOne({userName:username}).exec(function (err, user) {
            if(user){
                return done(null, user);
            }
            else{
                return done(null, false);
            }
        })
    }
));

passport.serializeUser(function (user, done) {
    if(user){
        done(null, user._id);
    }
});
passport.deserializeUser(function (id, done) {
    User.findOne({_id:id}).exec(function (err, user) {
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