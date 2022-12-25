'use strict'
//const u = require('./util.js');
const { SuperSet } = require('./SuperSet.js');

//نکات : docs.md
//حتما خوانده شود
//Read-doc


function SetNew(arr, iteration, notAtFirst = [], notLast = []) {
    let maxWordsize = Math.pow(2, iteration); //Maximum "Word Lenght" //How many Level?
    let TotalComb = []; TotalComb[0] = new Set(arr);// leve 0 : Base

    for (let n = 1; n < maxWordsize; n++) //creating level
        TotalComb.push(new Set());

    for (let level = 1; level < TotalComb.length; level++) {
        let dic = new Set();

        for (const word of TotalComb[0]) {
            for (const prvLvlwrd of TotalComb[level - 1]) {
                //not allowed last -> here   
                const w = word + prvLvlwrd;
                //const g = prvLvlwrd + word;
                dic.add(w);
                //dic.add(g);
            }
        }
        TotalComb[level] = dic;
        const safeTocleanLevel = level - 2;
        if (safeTocleanLevel > 0)
            removeUnwanted(TotalComb[safeTocleanLevel], notAtFirst, notLast);//Read-doc
    }
    removeUnwanted(TotalComb[TotalComb.length - 2], notAtFirst, notLast);
    removeUnwanted(TotalComb[TotalComb.length - 1], notAtFirst, notLast);
    return TotalComb;
}
function superSetCalculator(arr, iteration, notAtFirst = [], notLast = []) {
    let combs = new SuperSet(arr, "SourceSet");
    for (let repeat = 1; repeat <= iteration; repeat++) { //چندبار «ترکیب» لغات بررسی شود.

        let dic = new SuperSet(null, "Dictionary");
        for (const _wrd of combs) {//در هر مرحله نیز ترکیب های جدید ساخته شده اضافه میشود.
            for (const word of combs) { //باید تمامی محتویات سورس با خودش ترکسیب شود، سوپر ست تیکه تیکه است
                dic.add(_wrd + word);
            }
        }
        dic.sets.forEach(dic_set => {
            dic_set.forEach(word => {
                combs.add(word);
            });
        });
    }
    for (let set of combs.sets) { //بخاطر ذات سوپر ست احتمال تکراری، نیاز به بررسی
        removeUnwanted(set, notAtFirst, notLast);//Read-doc    
    }
    return combs.sets;
}
function setCalc(origin, iteration, notAtFirst = [], notLast = []) {
    let src = new Set(origin);
    for (let repeat = 1; repeat <= iteration; repeat++) {

        let dict = new Set();
        for (const tocmb of src) {//در هر مرحله نیز ترکیب های جدید ساخته شده اضافه میشود.
            //عنصر اولیه جهت ترکیب
            for (const word of src) {
                dict.add(tocmb + word);
            }
        }
        //ترکیبات پیدا شده، به منبع اضافه شده جهت ترکیبات بعدی
        dict.forEach(x => { src.add(x) });
    }
    removeUnwanted(src, notAtFirst, notLast); //Read-doc
    return src;
}
function calcArrayModel(arr, iteration, notAtFirst = [], notLast = []) {
    let maxWordsize = Math.pow(2, iteration);  //Maximum "Word Lenght" //How many Level?
    let TotalComb = []; TotalComb.push(arr);// leve 0 : Base

    for (let n = 1; n < maxWordsize; n++) //creating level
        TotalComb.push([]);

    for (let level = 1; level < TotalComb.length; level++) {

        for (const org_wrd of TotalComb[0]) {

            for (const prv_wrd of TotalComb[level - 1]) {

                const w = prv_wrd + org_wrd;
                const g = prv_wrd + org_wrd;
                (TotalComb[level]).push(w);
                (TotalComb[level]).push(g);
            }
        }
        const safeTocleanLevel = level - 2;
        if (safeTocleanLevel > 0)
            TotalComb[safeTocleanLevel] = new Set(removeUnwanted(TotalComb[safeTocleanLevel], notAtFirst, notLast, true));//Read-doc
    }
    TotalComb[TotalComb.length - 2] = new Set(removeUnwanted(TotalComb[TotalComb.length - 2], notAtFirst, notLast, true));
    TotalComb[TotalComb.length - 1] = new Set(removeUnwanted(TotalComb[TotalComb.length - 1], notAtFirst, notLast, true));

    return TotalComb;
}

//Read-doc
/**
 * This fn clean input Set of undesired patterns is word. remeber it WILL change inupt set for memory managment.
 * either send as const and use return or let it change.
 * @param {Set} data A Set That Will be Changed, don't instantiate as const otherwise you need to use result
 * @param {Array} notAtFirst forbidden char at strt of word
 * @param {Array} notLast forbidden char at end of word
 * @param {Boolean} doreturn if true, return result.
 * @returns Set
 */
function removeUnwanted(data, notAtFirst, notLast, doreturn = false) {
    let isSet = false;
    let isArray
    if (data instanceof Set) isSet = true;
    if (Array.isArray(data)) isArray = true;
    let NotAlowed_FirstLetter = notAtFirst;
    let NotAlowed_LastLetter = notLast;

    let delPos = new Set();
    data.forEach((word, i) => {
        let ln = word.length; let deleted = false;
        if (ln > 1)
            if (isSet)
                if (NotAlowed_FirstLetter.includes(word[0]) & !deleted) { data.delete(word); deleted = true; }
                else if (NotAlowed_LastLetter.includes(word[ln - 1]) & !deleted) { data.delete(word); deleted = true; } else;
            else
                if (isArray)
                    if (NotAlowed_FirstLetter.includes(word[0]) & !deleted) { delPos.add(i); deleted = true; }
                    else if (NotAlowed_LastLetter.includes(word[ln - 1]) & !deleted) { delPos.add(i); deleted = true; }
    });
    for (const pos of delPos)//only if array this would populate
        delete data[pos];
    if (doreturn) return data;
}

module.exports = { SetNew, superSetCalculator, setCalc, calcArrayModel }