/**
 * Created by Balkishan on 11/22/2017.
 */

$(document).ready(function () {
    var socket = io();

    $('form').submit(function () {
        var obj = {
            type: $('#type').val(),
            log: $('#input').val()
        };

        socket.emit('chat message', obj);
    });

    socket.on('replay', function (msg) {
        console.log('message received : %s',msg);

        $('#msgs').prepend("<p>" + msg + "</p>");
    });
});

//$(function () {
//    var socket = io();
//
//    $('form').submit(function () {
//        socket.emit('chat message',  $('#input').val());
//    });
//
//    socket.on('replay', function (msg) {
//        $('div>#msgs').append("<p>"+msg+"</p>");
//        console.log('message received : %s',msg);
//    });
//});