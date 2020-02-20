function jsonp(url, data = {}, callback = 'callback') {
    let dataStr = url.indexOf('?') === -1 ? '?' : '&' ;
    // 添加参数
    for(let key in data) {
        dataStr += `${key}=${data[key]}&`
    }

    // 添加回调函数
    dataStr += `callback=${callback}`;
    // 创建 script 元素
    let script = document.createElement('script');
    // script元素指定访问url地址
    script.src = url + dataStr;
    // 添加到body中
    document.body.appendChild(script);

    return new Promise((resolve, reject) => {
        // 监听回调函数
        window[callback] = (data) => {
            try {
                // 成功执行 将返回数据resolve
                resolve(data)
            } catch(e) {
                // 发成错误 将错误reject
                reject(e);
            } finally {
                // 最终移除添加的script元素
                script.parentNode.removeChild(script);
            }
        }
    })
}


jsonp('https://photo.sina.cn/aj/index', {page: 1, cate: 'recommand'}).then(res => {console.log(res)});