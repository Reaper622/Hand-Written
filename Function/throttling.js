function throttling(fn) {
    let timer = null;
    return function (...args) {
        // 如果上个执行还在 直接返回
        if (timer) return;
        timer = setTimeout(() => {
            fn.apply(this, args);
            // 执行完成后 清除当前定时器 使下次调用可以执行
            timer = null;
        }, 1000);
    }
}


function sayHello(name) {
    console.log(`hello ${name}`);
}


let foo = throttling(sayHello);


let count = 0;
let inter = setInterval(() => {
    if (count < 10) {
        count++;
        foo('reaper');
    } else {
        clearInterval(inter);
    }
}, 500);