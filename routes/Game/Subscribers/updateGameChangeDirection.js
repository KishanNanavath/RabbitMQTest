/**
 * Created by Balkishan on 11/22/2017.
 */

var constants = require('../config/constants.js');
var amqp = require('amqplib/callback_api');

var dbConfig = require('../../Environment/mongoConfig.js');

function subscribeUpdateGameChangeDirection() {
    amqp.connect(constants.amqpUrl, function (error, conn) {
        conn.createChannel(function (error, ch) {
            console.log('listening in channel');

            ch.assertExchange(constants.ex, 'fanout', {durable: false});
            ch.assertQueue('', {exclusive: true}, function (error, q) {
                console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", q.queue);

                ch.bindQueue(q.queue, constants.ex, '');

                ch.consume(q.queue, function (msg) {
                    console.log("[x] Received %s", msg.content.toString());
                    fetchMovieData(msg.content.toString());
                }, {noAck: true});

            });

            //var q = constants.playerChangeDirectionQueue;
            //
            //ch.assertQueue(q,{durable:false});
            //ch.consume(q, function (msg) {
            //    //socket.emit('replay','message from subscriber : '+msg.content.toString());
            //    console.log("[x] Received %s",msg.content.toString());
            //
            //    fetchMovieData(msg.content.toString());
            //
            //},{noAck:true});
        })
    });
}

function fetchMovieData(input) {
    var db = dbConfig.dbConfig;

    var moviesColl = db.collection('MOVIE');

    moviesColl.find({}).toArray(function (error, result) {
        console.log(JSON.stringify(result[0]));
    })

}

exports.subscribeUpdateGameChangeDirection = subscribeUpdateGameChangeDirection;