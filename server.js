var express = require('express');

var env = process.env.NODE_ENV = process.env.NODE_ENV || 'dev';
var config = require('./server/config/config')[env];
var app = express();

//Configure:
require('./server/config/express')(app, config);
require('./server/config/mongoose')(config);
require('./server/config/routes')(app);

app.listen(config.port);
console.log('Listening on port ' + config.port + '...');