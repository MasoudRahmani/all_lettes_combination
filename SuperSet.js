
class SuperSet {
    sets; //: Array<Set<string>>
    size = 0;
    #Id = "";
    constructor(data = null, UniqeName) {
        this.#Id = UniqeName;
        this.sets = [new Set()];
        if (data) {
            data.forEach(x => {
                this.add(x);
            });
        }
    }
    /**
     * 
     * @param {string} v = item
     * @returns Sets
     */
    add(v) {
        if (this.sets[this.sets.length - 1].size === 16777000) this.sets.push(new Set());
        let OldSize = this.sets[this.sets.length - 1].size;
        let r = this.sets[this.sets.length - 1].add(v);
        if (r.size > OldSize) {//since set dont add duplicate we need this.
            this.size++;
        }
        return r;
    }
    /**
     * 
     * @param {string} v = item
     * @returns true | false
     */
    has(v) {
        for (const set of this.sets) {
            if (set.has(v)) return true
        }
        return false;
    }
    getByIndex(idx) {
        if (typeof idx !== 'number') throw new TypeError(`Argument idx must be a Number. Got [${idx}]`);
        if (idx > this.size) throw new RangeError(`Index [${idx}] is out of range [0-${this.size - 1}]`);
        let whichSet;
        let tots = 0;
        let e = this.sets.some((x, i) => {
            tots += x.size;
            if (idx < tots) {
                whichSet = i;
                return true;
            }
        });
        //if (!e)
        //   throw new Error("shit");

        let pos = tots - this.sets[whichSet].size;
        let iter = this.sets[whichSet].keys();
        let result = iter.next();

        for (pos; !result.done; result = iter.next(), pos++) {
            if (pos === idx) return result.value;
        }
    }
    *[Symbol.iterator]() {
        for (const set of this.sets) {
            for (const item of set) {
                yield item;
            }
        }
    }
}
module.exports = { SuperSet };
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