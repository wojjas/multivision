'use strict';

var mongoose = require('mongoose');

module.exports = function (config) {
    //MongoDB:
    mongoose.connect(config.db);
    console.log('Connecting to db at: ' + config.db);

    var db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error...'));
    db.once('open', function callback() {
        console.log('db opened');
    });

    var userSchema = mongoose.Schema({
        firstName : String,
        lastName : String,
        username: String
    });
    var User = mongoose.model('User', userSchema);

    User.find({}).exec(function (err, collection) {
        if(collection.length === 0){
            User.create({firstName: 'Donald', lastName: 'Duck', username: 'dd'});
            User.create({firstName: 'Joe', lastName: 'Eames', username: 'je'});
            User.create({firstName: 'Joe', lastName: 'Doe', username: 'jd'});
        }
    })
}


