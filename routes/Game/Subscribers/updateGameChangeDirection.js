/**
 * Created by Balkishan on 11/22/2017.
 */

var constants = require('../config/constants.js');
var amqp = require('amqplib/callback_api');

function subscribeUpdateGameChangeDirection(socket){
    amqp.connect(constants.amqpUrl, function (error, conn) {
        conn.createChannel(function (error, ch) {
            console.log('listening in channel');
            var q = constants.playerChangeDirectionQueue;

            ch.assertQueue(q,{durable:false});
            ch.consume(q, function (msg) {
                socket.emit('replay','message from subscriber : '+msg.content.toString());
                console.log("[x] Received %s",msg.content.toString());
            },{noAsk:true});
        })
    });
}

exports.subscribeUpdateGameChangeDirection = subscribeUpdateGameChangeDirection;