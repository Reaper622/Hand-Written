Array.prototype._filter = function (cb, cbThis) {
    if (typeof cb !== 'function') {
        throw new TypeError(`${cb} is not a function`);
    }

    // 存储结果
    let result = [];
    // 判断 this是否绑定
    let CBThis = cbThis || null;

    this.reduce((sum, val, index, arr) => {
        if (cb.call(CBThis, val, index, arr) === true) {
            result.push(val);
        }
    })

    return result;
}


let arr = [1,2,3]

let filterArr = arr._filter(item => item > 1);

console.log(filterArr);