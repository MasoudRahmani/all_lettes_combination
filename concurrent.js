'use strict'
const u = require('./util.js');
const SuperSet = require('./SuperSet.js');

function calcCuncurrent(arr, iteration, no) {
    //send seperate ??

    let origin = ['1', '2', '3', '4'];
    let source = new Set(origin);

    let NotAlowed_firstLetter = ['@', '!', '#'];

    let combination = [];

    for (let i = 0; i < origin.length; i++)
        ChangeArray_str(origin[i],)


}
function ChangeArray_str(str, array) {

    return array.map(x => str + x);
}

module.exports = { calcCuncurrent };