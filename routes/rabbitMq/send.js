/**
 * Created by Balkishan on 11/6/2017.
 */

'use strict';
const amqp = require('amqplib/callback_api');

function sendDataToQueue(req,res){
    amqp.connect('amqp://localhost', function (error, connection) {
        if(error){
            console.log(JSON.stringify(error));
        }
        else{
            console.log('connection established');
            connection.createChannel(function (error, channel) {
                let q = req.body.queue;

                channel.assertQueue(q,{durable:false});
                channel.sendToQueue(q,new Buffer(req.body.message));
                console.log(" [x] Sent 'Hello World!'");
            });
            res.write('data sent');
            res.end();
            setTimeout(function() {
                connection.close();
                //process.exit(0)
            }, 500);
        }
    });
}

exports.sendDataToQueue = sendDataToQueue;