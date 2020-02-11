// 定义promise的三种状态
const PENDING = 'pending';
const FULFILLED = 'fulfilled';
const REJECTED = 'rejected';

function MyPromise(constructor) {
    let self = this;
    self.status = PENDING; // 定义状态为初始状态
    self.value = undefined; // 状态为 fulfilled 的时返回的值
    self.reason = undefined; // 状态为 rejected 时的错误原因


    function resolve(value) {
        // 判断状态是否为初始状态 只有初始状态能够resolve
        if (self.status === PENDING) {
                self.value = value;
                self.status = FULFILLED;
        }
    }

    function reject(reason) {
        // 判断状态是否为初始状态 只有初始状态能够reject
        if (self.status === PENDING) {
                self.reason = reason;
                self.status = REJECTED;
        }
    }
    // 执行定义的Promise函数
    try{
        constructor(resolve, reject);
    } catch {
        reject(e);
    }
}

// then方法
MyPromise.prototype.then = function(onFulfilled = val => val, onRejected = e => {throw e}) {
    let self = this;
    // 定义新的Promise的value
    let newValue = undefined;
    switch(self.status) {
        case FULFILLED : 
            newValue = onFulfilled(self.value); 
            break;
        case REJECTED : 
            newValue = onRejected(self.reason);
            break;
        default: 
    }
    // 完善链式调用
    return new MyPromise((resolve) => {
        resolve(newValue)
    });
}

let promise1 = new MyPromise((resolve, reject) => {
    resolve(123);
})

let promise2 = new MyPromise((resolve, reject) => {
    reject('Error');
})

promise1.then(res => {
    console.log(res);
    return res + 1;
}).then(res => {
    console.log(res);
})


promise2.then(res => res, err => {
    console.log(err);
    return 'value after error';
}).then(res => {
    console.log(res);
});
