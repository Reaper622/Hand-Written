// 函数柯里化
function curry(fn) {
    let args = Array.prototype.slice.call(arguments, 1);
    return function () {
        let innerArgs = Array.prototype.slice.call(arguments);
        let finalArgs = innerArgs.concat(args);
        return fn.apply(null, finalArgs);
    }
}


function mulity(a,b) {
    return a * b;
}

let mult5 = curry(mulity, 5);

console.log(mult5(4));