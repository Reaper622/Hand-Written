// 递归写法
function flattern(arr) {
    let result = []
    for(let i = 0; i < arr.length; i++) {
        if (Array.isArray(arr[i])) {
            result = result.concat(flattern(arr[i]));
        } else {
            result.push(arr[i]);
        }
    }
    return result;
}


// 扩展运算符写法
function flattern2(arr) {
    while(arr.some(item => Array.isArray(item))) {
        arr = [].concat(...arr);
    }
    return arr;
}

// reduce实现
function flattern3(arr) {
    let result = arr.reduce((prev, next) => {
        return prev.concat(Array.isArray(next) ? flattern3(next) : next);
    }, [])
    return result;
}

// Generator函数写法

function *flattern4(arr) {
    for(let item of arr) {
        if (Array.isArray(item)) {
            yield *flattern4(item);
        } else {
            yield item;
        }
    }
}


let arr = [1,2,3,[4,5,[6,7]]]

console.log(flattern(arr));

console.log(flattern2(arr));

console.log(flattern3(arr));

console.log([...flattern4(arr)]);
