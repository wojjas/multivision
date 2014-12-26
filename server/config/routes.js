'use:strict'
var auth = require('./auth');

module.exports = function (app) {
    app.get('/partials/*', function (req, res) {
        res.render('../../public/app/' + req.params[0]);
    })

    app.post('/login', auth.authenticate);

    //Redirects to index and lets the client-side-routing route depending on what's appended to index
    app.get('*', function (req, res) {
        res.render('index');
    });
}