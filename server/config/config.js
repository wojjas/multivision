var path = require('path');
var rootPath = path.normalize(__dirname + '/../../');

module.exports = {
    dev: {
        db: 'mongodb://localhost/multivision',
        rootPath: rootPath,
        port: process.env.PORT || 3030
    },
    prod: {
        rootPath: rootPath,
        db: 'mongodb://jeames:multivision@ds053178.mongolab.com:53178/multivision',
        port: process.env.PORT || 80
    }
}