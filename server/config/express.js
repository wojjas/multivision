var express = require('express');
var stylus = require('stylus');

module.exports = function (app, config) {

    function compile(str, path) {
        return stylus(str).set('filename', path);
    }
    //app.set('views', './server/views');
    app.set('views', config.rootPath + '/server/views');
    app.set('view engine', 'jade');
    app.use(stylus.middleware(
        {
            src: config.rootPath + '/public',
            compile: compile
        }
    ));
    app.use(express.static(config.rootPath + '/public'));

}
