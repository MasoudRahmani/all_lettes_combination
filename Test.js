/* eslint-disable no-unused-vars */
const path = require('path');
const u = require('./util.js');

let arr = []
perfTime(() => {
    arr[0] = 10; arr[1] = 10; arr[2] = 10; arr[3] = 10; arr[4] = 10; arr[5] = 12
    for (let i = 5; i < 5000000; i++)
        arr[i] = i - Math.random() * 1000;
});
const { setCalc, SetNew, superSetCalculator, calcArrayModel } = require('./All_comb_word_fn.js');
const { SuperSet } = require('./SuperSet.js');



let chars = ['m', 'M', '13911281', '13711371', '1271366411', '@', '#', '!'];
let notFirst = [];
let notLast = [];
let iteration = 2;
let result;



perfTime(() => {
    result = superSetCalculator(chars, iteration, notFirst, notLast); // check high?
    WriteResult(result, 1);
});


perfTime(() => {
    result = setCalc(chars, iteration, notFirst, notLast);//high number problem
    WriteResult(result, 2);
});
perfTime(() => {
    result = calcArrayModel(chars, iteration, notFirst, notLast); //very slow
    WriteResult(result, 4);
});




function perfTime(func) {
    console.time();
    try {
        func();
    } catch (error) {
        console.log(u.ShortError(error, 300));
    }
    console.timeEnd();
}

function WriteResult(result, t) {
    // eslint-disable-next-line no-undef
    const filepath = path.join(__dirname, './result', `${Date.now() + Math.random()}.txt`);

    const write = (r, desc) => {
        u.WriteToFile(filepath, `\t\t ${desc} ${new Date().toLocaleString()} \t\t\n`);
        (r).forEach(level => { u.WriteArrayToFile(filepath, level); });
    }

    switch (t) {
        case 1:
            write(result, "superSetCalculator Created:");
            break;
        case 2:
            u.WriteToFile(filepath, `\t\t setCalc Created: ${new Date().toLocaleString()} \t\t\n`);
            u.WriteArrayToFile(filepath, result);
            break;
        case 3:
            write(result, "SetNew Created:");
            break;
        case 4:
            write(result, "Array Model Created:");
            break;
    }
}

//test();
function test() {
    let ss = new SuperSet(null, "Test");
    let sum1 = 0;
    const testsize = 16777003;
    for (let i = 0; i < testsize; i++) {
        ss.add(i);
        sum1 += i;
    }
    let sum = 0
    for (const s of ss) {
        sum += s;
    }

    console.log(sum);
    console.log(sum1);
}