function wait(delay, times, func) {
    if (typeof delay !== 'number') {
        throw new TypeError(`${delay} should be a number`);
    }
    if (typeof times !== 'number') {
        throw new TypeError(`${times} should be a number`);
    }
    if (typeof func !== 'function') {
        throw new TypeError(`${func} is not a function`);
    }
    for(let i = 1; i <= times; i++) {
        setTimeout(func, delay * i);
    }
}


function sayHi() {
    console.log('hi')
}

wait(2000, 3, sayHi);