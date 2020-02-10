// 原生实现 call
Function.prototype._call = function (context, ...args) {
    if (typeof context !== 'object') {
        throw new TypeError(`${context} should be a object`);
    }
    // 给此上下文绑定函数
    context.fn = this;
    // 执行函数 获取结果
    let result ;
    if(args === null) {
        result = context.fn();
    } else {
        result = context.fn(...args);
    }
    // 删除绑定的函数空间
    delete context.fn;

    return result;
}

// 原生实现 Apply
Function.prototype._apply = function(context, args) {
    if (typeof context !== 'object') {
        throw new TypeError(`${context} should be a object`);
    }
    // 绑定函数上下文
    context.fn = this;
    // 执行函数 获得返回结果
    let result ;
    if(args === undefined) {
        result = context.fn();
    } else {
        result = context.fn(...args);
    }
    // 删除绑定的函数空间
    delete context.fn;

    return result;
}


function sayHello(words, time) {
    console.log(this.name + ' ' + words + ' ' + time);
}

function sayName() {
    console.log(this.name);
}
let obj = {name: 'reaper'};


sayName._call(obj);
sayHello._call(obj, 'hello', '2020-2-10');
sayName._apply(obj);
sayHello._apply(obj, ['hello', '2020-2-10']);



