/**
 * Created by Balkishan on 11/22/2017.
 */

var mongoClient = require('mongodb'),
    assert = require('assert');

var tmdbUrl = 'mongodb://localhost:27017/TMDB';

var dbConfig = null;
mongoClient.connect(tmdbUrl, function (err, db) {
    assert.equal(null, err);
    console.log("connected correctly to server");
    exports.dbConfig = db;
    //db.close();
});


var rabbitMqUrl = 'mongodb://localhost:27017/RabbitMqDb';

var rabbitDbConfig = null;
mongoClient.connect(rabbitMqUrl, function (err, db) {
    assert.equal(null, err);
    console.log("connected correctly to server");
    exports.rabbitDbConfig = db;
    //db.close();
});
