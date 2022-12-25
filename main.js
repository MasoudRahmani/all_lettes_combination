
const { SetNew, superSetCalculator } = require('./All_comb_word_fn.js');
const path = require('path');
const u = require('./util.js');

//نکات : docs.md
//حتما خوانده شود

//یک حذف تکراری ها در مواقع مناسب، نیاز مند پیاده سازی دارد برای آرایه
//حذف موارد نامناسب در مواقع مناسب نیاز به پیاده سازی
//پارالل

let chars = ['m', 'M', '13911281', '13711371', '1271366411', '@', '#', '!'];
let notFirst = [];
let notLast = [];
let iteration = 3;
let result;


perfTime(() => {
    result = superSetCalculator(chars, iteration, notFirst, notLast); // check high?
    WriteResult(result, 1);
});
perfTime(() => {
    result = SetNew(chars, iteration, notFirst, notLast); //is there any problem, large?
    WriteResult(result, 3);

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

