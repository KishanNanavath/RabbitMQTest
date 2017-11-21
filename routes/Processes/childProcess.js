/**
 * Created by Balkishan on 11/13/2017.
 */

async = require('async');
myCode = require('./myCode.js');

exports.myProcess = function (input, callback) {

    var taskArray = [];

    var page = 0;
    var itemsPerPage = 10;
    for(var i=itemsPerPage;i<100;i+=itemsPerPage){
        taskArray.push(function (task_callback) {
            input.page = page;
            page+=1;
            input.itemsPerPage = itemsPerPage;

            console.log(JSON.stringify(input));

            myCode.myFunc(input, function (error, result) {
                console.log(result);
                return task_callback(false,result);
            })
        })
    }
    
    async.parallelLimit(taskArray,5, callback);

    //myCode.myFunc(input, function (error, result) {
    //    console.log(result);
    //    return callback(false,result);
    //})
};

exports.createNewProcess = function (command) {
    const childProcess = require('child_process');

    var page = 0;
    var itemsPerPage = 10;
    for(var i=itemsPerPage;i<100;i+=itemsPerPage){
        var input ={};
        input.page = page;
        page+=1;
        input.itemsPerPage = itemsPerPage;

        console.log(JSON.stringify(input));

        var child = childProcess.spawn('node',[__dirname+'\\inter.js',input]);

        child.stdout.on('data', function (data) {
            console.log('OK');
            console.log("data -- >"+data);
        });

        child.stderr.on('data', function (data) {
            console.log("Not OK");
            console.log(data.toString());
        });

        child.on('close', function (code) {
            console.log('child process exited with code ' + code);
        });

        //myCode.myFunc(input, function (error, result) {
        //    console.log(result);
        //    return task_callback(false,result);
        //})
    }

    //const child = spawn('node',[__dirname+'\\inter.js',1]);
    ////console.log(child);
    //
    //child.stdout.on('data', function (data) {
    //    console.log('OK');
    //    console.log("data -- >"+data);
    //});
    //
    //child.stderr.on('data', function (data) {
    //    console.log("Not OK");
    //    console.log(data.toString());
    //});
    //
    //child.on('close', function (code) {
    //    console.log('child process exited with code ' + code);
    //});
};
