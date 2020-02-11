// 定义promise的三种状态
const PENDING = 'pending';
const FULFILLED = 'fulfilled';
const REJECTED = 'rejected';

function MyPromise(constructor) {
    let self = this;
    self.status = PENDING; // 定义状态为初始状态
    self.value = undefined; // 状态为 fulfilled 的时返回的值
    self.reason = undefined; // 状态为 rejected 时的错误原因
    self.onFulfilledCallbacks = []; // 状态转为 fulfilled 时的回调函数
    self.onRejectedCallbacks = []; // 状态转为 rejected 时的回调函数


    function resolve(value) {
        // 防止同步执行，而应该在then处执行
        setTimeout(() => {
            // 判断状态是否为初始状态 只有初始状态能够resolve
            if (self.status === PENDING) {
                    self.value = value;
                    self.status = FULFILLED;
                    // 循环执行回调函数
                    self.onFulfilledCallbacks.forEach(cb => cb(self.value));
            }
        })
    }

    function reject(reason) {
        // 防止同步执行，而应该在then处执行
        setTimeout(() => {
            // 判断状态是否为初始状态 只有初始状态能够reject
            if (self.status === PENDING) {
                    self.reason = reason;
                    self.status = REJECTED;
                    // 循环执行回调函数
                    self.onRejectedCallbacks.forEach(cb => cb(self.reason));
            }
        })
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
    let newPromise;
    switch(self.status) {
        case FULFILLED : 
            newPromise = new MyPromise((resolve, reject) => {
                setTimeout(() => {
                    try{
                        let newVal = onFulfilled(self.value);
                        resolve(newVal);
                    } catch{
                        reject(e);
                    }
                })
            })
            break;
        case REJECTED : 
            newPromise = new MyPromise((resolve, reject) => {
                setTimeout(() => {
                    try{
                        let newVal = onRejected(self.reason);
                        resolve(newVal);
                    } catch{
                        reject(e);
                    }
                })
            })
            break;
        case PENDING :
            newPromise = new MyPromise((resolve, reject) => {
                // 如果还在执行态就把对应的OnFulfilled 和 OnRejected 暂存到回调数组中
                self.onFulfilledCallbacks.push((value) => {
                    try{
                        let newVal = onFulfilled(value);
                        resolve(newVal);
                    } catch{
                        reject(e);
                    }
                })

                self.onRejectedCallbacks.push((err) => {
                    try{
                        let newVal = onRejected(err);
                        resolve(newVal);
                    } catch{
                        reject(e);
                    }
                })
            })

    }
    // 返回新的Promise 完善链式调用
    return newPromise;
}
// catch 方法就是省略了第一项的then方法
MyPromise.prototype.catch = function (onRejected) {
    return this.then(res => res, onRejected);
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


promise2.catch(err => {
    console.log(err);
    return 'value after error';
}).then(res => {
    console.log(res);
});
