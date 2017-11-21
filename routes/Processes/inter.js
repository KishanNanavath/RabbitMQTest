/**
 * Created by Balkishan on 11/13/2017.
 */

myCode = require('./myCode.js');

//console.log("Child Process " + process.argv + " executed." );

var input = process.argv[2];

console.log(JSON.stringify(input))
myCode.myFunc(input, function (error, result) {
    console.log(JSON.stringify(result));
    //return task_callback(false,result);
})