/**
 * Created by Balkishan on 11/22/2017.
 */

$(function () {
    var socket = io();
    //socket.emit('chat message', 'Left');
    socket.on('replay', function (msg) {
        console.log('message received : %s',msg);
    })
});