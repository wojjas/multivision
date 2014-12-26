var path = require('path');
var rootPath = path.normalize(__dirname + '/../../');

module.exports = {
    dev: {
        //db: 'mongodb://localhost/multivision',
        db: 'mongodb://wojjas:test@ds063170.mongolab.com:63170/multivision',
        rootPath: rootPath,
        port: process.env.PORT || 3030
    },
    prod: {
        rootPath: rootPath,
        //db: 'mongodb://jeames:multivision@ds053178.mongolab.com:53178/multivision',
        db: 'mongodb://wojjas:test@ds063170.mongolab.com:63170/multivision',
        port: process.env.PORT || 80
    }
}