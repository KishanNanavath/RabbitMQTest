/**
 * Created by Balkishan on 11/23/2017.
 */

var constants = require('../config/constants.js');
var amqp = require('amqplib/callback_api');

var dbConfig = require('../../Environment/mongoConfig.js');

function subscribeStoreLogsInDB() {
    amqp.connect(constants.amqpUrl, function (error, conn) {
        conn.createChannel(function (error, ch) {
            console.log('listening in 2nd channel');

            ch.assertExchange(constants.directEx, 'direct', {durable: false});
            ch.assertQueue('', {exclusive: true}, function (error, q) {
                console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", q.queue);

                //var availableKeys = ['info','error'];
                ch.bindQueue(q.queue, constants.directEx, 'info');
                ch.bindQueue(q.queue, constants.directEx, 'error');

                ch.consume(q.queue, function (msg) {
                    console.log("[x] Received %s", msg.content.toString());
                    console.log("msg : ", JSON.stringify(msg));
                    storeLogsInDB(msg.content.toString());
                }, {noAck: true});

            });
        })
    });
}

function storeLogsInDB(log) {
    var db = dbConfig.rabbitDbConfig;

    var logsColl = db.collection('logs');

    var insertQuery = {
        "log": log,
        "type": "ERROR",
        "lastUpdated": new Date()
    };
    logsColl.insert(insertQuery, function (error, result) {
        if (error) {
            throw error
        }
        else {
            console.log('stored');
        }
    })
}

exports.subscribeStoreLogsInDB = subscribeStoreLogsInDB;