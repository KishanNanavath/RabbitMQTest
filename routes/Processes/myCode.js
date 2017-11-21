/**
 * Created by Balkishan on 11/13/2017.
 */

exports.myFunc = function (input, callback) {

    var res = [];
    for(var i = 0;i<100;i++){
        res.push(i);
    }

    //console.log(input)
    setTimeout(function () {
        //console.log(input.page*input.itemsPerPage,(input.page+1)*input.itemsPerPage);
        res = res.slice(input.page*input.itemsPerPage,(input.page+1)*input.itemsPerPage);
        return callback(false,res)
    },1000*input.page);
};