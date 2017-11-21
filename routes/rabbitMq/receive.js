/**
 * Created by Balkishan on 11/6/2017.
 */

'use strict';
const amqp = require('amqplib/callback_api');

function receiveDataFromQueue(req,res){
    console.log(JSON.stringify(req.body));

    amqp.connect('amqp://localhost', function (error, connection) {
        if(error){
            console.log(JSON.stringify(error));
        }
        else{
            connection.createChannel(function (error, channel) {
                console.log(JSON.stringify(req.body));
                let q = req.body.queue;

                channel.assertQueue(q,{durable:false});
                console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", q);

                Promise.resolve('dummy')
                    .then(function (msg) {
                        return new Promise(function (resolve, reject) {
                            channel.consume(q, function (msg) {
                                var secs = msg.content.toString().split('.').length - 1;

                                //console.log(" [x] Received %s", msg.content.toString());

                                setTimeout(function () {
                                    console.log(req.body.id+" [x] Received "+ msg.content.toString());
                                    //res.json({msg:" [x] Received "+ msg.content.toString()});
                                    //res.end();
                                    //resolve('ok');
                                },secs*1000);

                            },{noAck:true});
                        });
                    }).then(function (result) {
                        res.end("\nAfter last then");
                    })
                    .catch(function (error) {
                        //res.write(error);
                        res.end("\nAfter catch");
                    })
            })
        }
    });
}

exports.receiveDataFromQueue = receiveDataFromQueue;