
const { SetNew } = require('./All_comb_word_fn.js');
const path = require('path');
const u = require('./util.js');
// eslint-disable-next-line no-undef
const currentDir = __dirname;
const letters = u.GetJsonObj(path.join(currentDir, 'config/letters.json'));

//نکات : docs.md
//حتما خوانده شود

//یک حذف تکراری ها در مواقع مناسب، نیاز مند پیاده سازی دارد برای آرایه
//حذف موارد نامناسب در مواقع مناسب نیاز به پیاده سازی
//پارالل
//در سوپر ست وقتی از حد میگذرد ادامه داده در یک فضای جدید ذخیره میشود، برای همین در هنگام پاک سازی تکراری ها این داده ها نسبت به هم پاک سازی نمیشوند.
//به همین دلیل تکراری داریم.

let chars = letters;
let notFirst = [];
let notLast = [];
let iteration = 3;
let result;

// SetNew Algorithm is the best one so far -> no known issue 
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
    const filepath = path.join(currentDir, './result', `${Date.now() + Math.random()}.txt`);

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

