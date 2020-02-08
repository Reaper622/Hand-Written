Function.prototype._bind = function (thisArg) {
    // 检测 绑定的this
    if (typeof this !== 'function') {
        throw new TypeError(`${this} is not a function`)
    }
    // 存储当前this上下文
    let self = this;
    // 返回一个函数 函数的执行结果为 call执行的结果
    return  function (...args) {
        return self.call(thisArg, ...args);
    }
    
}

function sayName ( age ) {
    this.age = age;
    console.log(this.name,  this.age);
}

let obj = {
    name: 'reaper'
}


sayName._bind(obj)(20);