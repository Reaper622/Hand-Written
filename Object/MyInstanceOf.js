function myInstanceOf(left, right) {
    // 获取所检测对象的原型
    let proto = left.__proto__;
    let prototype = right.prototype;
    while(true) {
        if (proto === null) return false;
        if (proto === prototype) return true;

        // 沿着原型链向上查找
        proto = proto.__proto__;
    }
}

function Person() {
    this.age = 18;
}


function Child() {
    this.name = 'reaper';
}


Child.prototype = new Person();

Child.prototype.constructor = Child


let child = new Child();


console.log(myInstanceOf(child, Person));
console.log(myInstanceOf(child, Child));