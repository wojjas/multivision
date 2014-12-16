'use strict';

var mongoose = require('mongoose');

module.exports = function (config) {
    //MongoDB:
    //Choose which db to connect to:
    //  On Windows: set NODE_ENV=dev  (or production)
    //  On Heroku:
    mongoose.connect(config.db);
    console.log('Connecting to db at: ' + config.db);

    var db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error...'));
    db.once('open', function callback() {
        console.log('db opened');
    });
}


