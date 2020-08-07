var low = require('lowdb');
var FileSync = require('lowdb/adapters/FileSync');
adapter = new FileSync('db.json');
db = low(adapter);

db.defaults({ animals: [] })
    .write();

    module.exports = db