var express = require('express');
var stylus = require('stylus');
var logger = require('morgan');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
//var jade = require('jade');

var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';

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
//mongoose.connect('mongodb://localhost/multivision');
mongoose.connect('mongodb://wojjas:test@ds063170.mongolab.com:63170/multivision');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error...'));
db.once('open', function callback(){
    console.log('db opened');
});
//get data from db:
var messageSchema = mongoose.Schema({message: String});
var Messages = mongoose.model('Messages', messageSchema);
var mongoMessage = "null";
Messages.findOne().exec(function (err, messageDoc) {
    if(err){
        console.error("DB read error: ", err);
        mongoMessage = "Error";
    }
    mongoMessage = messageDoc.message === "" ? "[No message]" : messageDoc.message;
})


app.get('/partials/:partialPath', function (req, res) {
    res.render('partials/' + req.params.partialPath);
})

//Redirects to index and lets the client-side-routing route depending on what's appended to index
app.get('*', function (req, res) {
    res.render('index', {
        mongoMessage: mongoMessage
    });
});

var port = 3030;
app.listen(port);
console.log('Listening on port ' + port + '...');