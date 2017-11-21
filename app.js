/**
 * Created by Balkishan on 11/6/2017.
 */

const express = require('express');
const app = express();

var bodyParser = require('body-parser');
app.use(bodyParser.json({limit: '5mb'}));

rabbitSend = require('./routes/rabbitMq/send.js');
rabbitReceive = require('./routes/rabbitMq/receive.js');

myProcess = require('./routes/Processes/childProcess.js');

//var input = {
//    page:0,
//    itemsPerPage:10
//};
//
//myProcess.myProcess(input, function (error,result) {
//    if(error){
//
//    }
//    else{
//        console.log(result);
//    }
//})

myProcess.createNewProcess('kishan');

app.get('/', function (req, res) {
    res.write("Got It !");
    res.end();
});

app.post('/rabbitmq/send', function (req, res) {
    rabbitSend.sendDataToQueue(req,res);
});

app.post('/rabbitmq/receive', function (req,res) {
    rabbitReceive.receiveDataFromQueue(req,res);
});

app.listen(1234);
console.log("listening at 1234");