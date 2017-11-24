/**
 * Created by Balkishan on 11/22/2017.
 */

var constants = require('../config/constants.js');
var amqp = require('amqplib/callback_api');

function publishPlayerChangeDirection(dir,socket){
    amqp.connect(constants.amqpUrl, function (error, conn) {
        conn.createChannel(function (error, ch) {
            ch.assertExchange(constants.directEx, 'direct', {durable: false});
            ch.publish(constants.directEx, dir.type, new Buffer(JSON.stringify(dir)), {'content_type': 'application/json'});
            console.log("[x] Send " + JSON.stringify(dir));
            //conn.close();
            socket.emit('replay','message sent from publisher');

            //var q = constants.playerChangeDirectionQueue;
            //
            //ch.assertQueue(q,{durable:false});
            //ch.sendToQueue(q,new Buffer(dir));
            //console.log("[x] Send "+dir);
            ////conn.close();
            //socket.emit('replay','message sent from publisher');
        });
        setTimeout(function () {
            conn.close();
        }, 500);
    });
}

exports.publishPlayerChangeDirection = publishPlayerChangeDirection;