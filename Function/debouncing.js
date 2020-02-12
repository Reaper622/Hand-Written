function deboundcing(fn) {
    let timer = null;
    return function (...args) {
        // 清除之前的定时器 保证只执行最新的
        if (timer) clearTimeout(timer);
        timer = setTimeout(() => {
            // 执行函数
            fn.apply(this, args);
            // 执行完成后清空定时器 1s后的执行可以照常
            timer = null;
        }, 1000)
    }
}


function sayHello(name) {
    console.log(`Hello ${name}!`);
}

let foo = deboundcing(sayHello);


let count = 0
let inter = setInterval(() => {
    if (count < 10) {
        foo('reaper');
        count++;
    } else {
        clearInterval(inter);
    }
}, 100);
// 只输出一次

// 2s 后的函数执行并不受影响
setTimeout(() => {
    foo('reaper after 2 s')
}, 3000);