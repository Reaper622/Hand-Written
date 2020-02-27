// Promise
const sleepPromise = delay => {
    console.log('Promise sleep start');
    return new Promise(resolve => setTimeout(resolve, delay));
}
sleepPromise(1000).then(res => {console.log('Promise sleep end')});

// Generator
function *sleepGenerator(delay) {
    console.log('Generator sleep start')
    yield new Promise((resolve, reject) => {
        setTimeout(resolve, delay);
    })
}


sleepGenerator(3000).next().value.then(res => {
    console.log('Generaotr sleep end');
})

// async
async function sleepAsync(delay) {
    console.log('async sleep start')
    return await new Promise((resolve, reject) => {
        setTimeout(resolve,delay);
    })
}

sleepAsync(5000).then(res => {console.log('async sleep end')})


// es5没有链式调用 只能使用回调
function sleep(time, callback) {
    console.log('sleep start')
    if (typeof callback !== 'function') {
        setTimeout(() => {console.log(callback)}, time);
    } else {
        setTimeout(callback, time);
    }
}

function output () {
    console.log('sleep finish');
}

var value = 123;
sleep(7000, output);
sleep(8000, value);