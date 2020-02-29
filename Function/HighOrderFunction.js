function add(x,y) {
    return x + y;
}

function multiply (x ,y) {
    return x * y;
}

function WithLog (fn) {
    return (x, y) => {
        let result = fn(x,y);
        console.log(`result is ${result}`);
        return result;
    }
}

const logAdd = WithLog(add);
const logMultiply = WithLog(multiply);

logAdd(5,4)

logMultiply(2,5)