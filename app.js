/**
 * Created by Balkishan on 11/22/2017.
 */

var express = require('express');
var app = express();

var http = require('http').Server(app);
var io = require('socket.io')(http);

var PORT = 3000;
app.use(express.static('UI'));

var mongoConfig = require('./routes/Environment/mongoConfig.js');

/*---------------------------*/
/*---------------------------*/
var publishers = require('./routes/Game/Publishers/playerChangeDirection.js');
var subscriber = require('./routes/Game/Subscribers/subscribers.js');

app.get('/', function (req, res) {
    res.sendFile(__dirname+"/UI/index.html");
});

app.get('/publish', function (req, res) {

});

app.get('/subscribe', function (req, res) {

});

io.on('connection', function (socket) {

    //socket.join('chatroom');

    socket.on('chat message', function (msg) {
        console.log('message : %s', JSON.stringify(msg));
        socket.emit('replay', 'from : ' + msg);
        publishers.publishPlayerChangeDirection(msg,socket);
    })

});

http.listen(PORT, function(){
    console.log('listening on *:%s',PORT);
});