var fs = require('fs');

//search set by index
const getByIndex = (set, idx) => {
    if (typeof idx !== 'number') throw new TypeError(`Argument idx must be a Number. Got [${idx}]`);
    if (idx > set.size) throw new RangeError(`Index [${idx}] is out of range [0-${set.size - 1}]`);

    //let pos = 0; let val;
    //set.forEach(x => { if (pos++ === idx) val = x; });
    let iter = set.keys()
    for (let i = 0, result = iter.next(); !result.done; result = iter.next(), i++)
        if (i == idx) { return result.value; }
}
function WriteArrayToFile(path, array, seperator = "\n") {
    var file = fs.openSync(path, 'as+')

    array.forEach(x => {
        if (x)
            fs.writeSync(file, x + seperator);
        else console.log(x);
    });
}
function WriteToFile(path, data) {
    var file = fs.openSync(path, 'as+')

    fs.writeSync(file, data);
}
function ShortError(err, count) {
    return (err.message) ? `${err.message.substring(0, count)}...` : '';
}
function GetJsonObj(path) {
    try {
        return JSON.parse(fs.readFileSync(path));
    } catch (err) {
        console.log(ShortError(err));
        return false;
    }
}
module.exports = { getByIndex, WriteArrayToFile, WriteToFile, ShortError, GetJsonObj };