Array.prototype._map = function (cb, cbThis) {
    // 判断cb是否为函数
    if (typeof cb !== 'function') {
        throw new TypeError(`${cb} is not a function`);
    }
    // 存储结果
    let result = [];
    // 是否有绑定的this
    let CBThis = cbThis || null;
    // 判断this是否为
    this.reduce((sum, val, index, arr) => {
        // 使用函数处理，传入绑定的this 值 索引和数组对象
        
        result.push(cb.call(CBThis, val, index, arr));
    })
    return result;
}

let arr = [1,2,3]

let mapArr1 = arr._map((item, index, arr) => item * 2)

console.log(mapArr1)

let mapArr2 = arr._map((item, index, arr) => {
    console.log(index);
    console.log(arr);
})

let mapArr3 = arr._map(1); // TypeError