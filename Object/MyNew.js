function MyNew(func) {
    // 创建一个新的空对象
    let obj = {};
    // 绑定原型对象
    if (func.prototype !== null) {
        obj.__proto__ = func.prototype
    }
    // 将构造函数的this绑定到新对象
    let result = func.apply(obj, [].slice.call(arguments, 1));
    // 判断返回类型 如果是医用类型则返回 如果是基础类型则返回新的空对象
    if ((typeof result === 'object' || typeof result === 'function') && result !== null) {
        return result;
    }
    return obj;
}


function Foo(name,age) {
    this.name = name;
    this.age = age;
    return this;
}
// 返回基础数据类型
function ReturnValue() {
    this.name = 'return 123';
    return 123;
}

// 返回引用数据类型
function ReturnObj() {
    let obj = {};

    obj.name = 'return obj';

    return obj;
}

let obj1 = MyNew(Foo, 'reaper', 20);

let obj2 = MyNew(ReturnValue);

let obj3 = MyNew(ReturnObj);

console.log(obj1);

console.log(obj2);

console.log(obj3);