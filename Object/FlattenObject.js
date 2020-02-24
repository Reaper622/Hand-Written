 /*
 * 说明：请实现 flatten(input) 函数，input 为一个 javascript 对象（Object 或者 Array），返回值为扁平化后的结果。
 * 示例：
 *   var input = {
 *     a: 1,
 *     b: [ 1, 2, { c: true }, [ 3 ] ],
 *     d: { e: 2, f: 3 },
 *     g: null, 
 *   }
 *   var output = flatten(input);
 *   output如下
 *   {
 *     "a": 1,
 *     "b[0]": 1,
 *     "b[1]": 2,
 *     "b[2].c": true,
 *     "b[3][0]": 3,
 *     "d.e": 2,
 *     "d.f": 3,
 *     // "g": null,  值为null或者undefined，丢弃
 *  }
 */

function flatten (input) {
  	// 返回结果
	let result = {}
    // 展开传入值
    flattenHelper(input);
  	return result;
  
  /**
  * obj 传入的对象或者基础属性值
  * str 属性名前缀
  **/
  function flattenHelper(obj, prefix) {
    // 值为null或者undefined，丢弃
    if (obj === null || obj === undefined) {
    	return ;
    }
    // 如果传入的是对象 对象属性用 . 连接 同时
    if (typeof obj === 'object' && !Array.isArray(obj)) {
      	// 定义标识判断是否为空
      	let empty = true;
        for(let i in obj) {
          empty = false;
          // 递归解析引用类型的各属性
          flattenHelper(obj[i], prefix ? prefix + `.${i}` : i);
        }
        // 如果对象为空
        if (empty && prefix) {
          result[prefix] = {};
        }
    }
  
  	// 如果传入为数组 数组属性用 [] 连接
  	else if (Array.isArray(obj)) {
    	let lens = obj.length;
    	// 数组不为空
        if (lens > 0) {
      		// 递归遍历数组属性
      		obj.map((item, index) => {
              flattenHelper(item, prefix ? `${prefix}[${index}]` : index);
            })
    	} 
  		// 如果数组为空
      	else {
        	result[prefix] = [];
        }
    }
	// 传入基本类型属性
	else {
      	result[prefix] = obj;
    }
  }
}







