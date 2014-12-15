var express = require('express');
var stylus = require('stylus');
var logger = require('morgan');
var mongoose = require('mongoose');
//var jade = require('jade');

var env = process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

var app = express();

function compile(str, path) {
    return stylus(str).set('filename', path);
}

//Configure express:
//app.set('views', './server/views');
app.set('views', __dirname + '/server/views');
app.set('view engine', 'jade');
app.use(stylus.middleware(
    {
        src: __dirname + '/public',
        compile: compile
    }
));
app.use(express.static(__dirname + '/public'));

//MongoDB:
//Choose which db to connect to:
//  On Windows: set NODE_ENV=dev  (or production)
//  On Heroku:
if(env === 'dev'){
    mongoose.connect('mongodb://localhost/multivision');
    console.log('local db');
}
else{
    mongoose.connect('mongodb://wojjas:test@ds063170.mongolab.com:63170/multivision');
    console.log('db on mongolab');
}

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error...'));
db.once('open', function callback(){
    console.log('db opened');
});
//Uncommented since not used anymore:
//get data from db:
//var messageSchema = mongoose.Schema({message: String});
//var Messages = mongoose.model('Messages', messageSchema);
//var mongoMessage = "null";
//Messages.findOne().exec(function (err, messageDoc) {
//    if(err){
//        console.error("DB read error: ", err);
//        mongoMessage = "Error";
//    }
//    else if(!messageDoc){
//        console.error("Collection/document not found in DB");
//    }
//    else{
//        mongoMessage = messageDoc.message === "" ? "[Empty field]" : messageDoc.message;
//    }
//})


app.get('/partials/*', function (req, res) {
    res.render('../../public/app/' + req.params[0]);
})

//Redirects to index and lets the client-side-routing route depending on what's appended to index
app.get('*', function (req, res) {
//    res.render('index', {
//        mongoMessage: mongoMessage
//    });
    res.render('index');
});

var port = process.env.PORT || 3030;
app.listen(port);
console.log('Listening on port ' + port + '...');