var express = require('express');
var jade = require('jade');

var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var app = express();

//Configure express:
console.log('dbg1: ' + __dirname);
app.set('views', './server/views');
//app.set('views', __dirname + '/server/views');
app.set('view engine', 'jade');

//Redirects to index and lets the client-side-routing route depending on what's appended to index
app.get('*', function (req, res) {
    res.render('index');
});

var port = 3030;
app.listen(port);
console.log('Listening on port ' + port + '...');