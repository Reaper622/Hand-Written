/** 
 * 函数组合运行
 * 说明：实现一个方法，可将多个函数方法按从左到右的方式组合运行。
 *   如`composeFunctions(fn1,fn2,fn3,fn4)`等价于`fn4(fn3(fn2(fn1))`。
 * 示例：
 *  const add = x => x + 1;
 *  const multiply = (x, y) => x * y;
 *  const multiplyAdd = composeFunctions(multiply, add);
 *  multiplyAdd(3, 4) // 返回 13
 */

function composeFunctions (...fns) {
    return (...args) => {
      // 使用reduce 调用传入的函数组 按先传入先调用顺序，前面调用的结果为下一次调用的参数
      return fns.reduce((res, fn, index) => {
        // 如果是第一个函数 则传入参数
        if (index === 0) {
          return fn(...args);
        } else {
          return fn(res);
        }
      }, null)
    }
  }