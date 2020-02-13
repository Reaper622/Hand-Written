function EventEmiter () {
    // key-value 存储事件和对应的回调函数数组
    events = {};

    // 监听函数
    function on(event, handler) {
        // 判断该事件是否已经存在
        // 如果已经存在 则在回调函数数组中添加该函数 不存在则新建一个回调数组
        if (events.hasOwnProperty(event)) {
            events[event].push(handler);
        } else {
            events[event] = [handler];
        }
    }

    // 监听函数 且只执行一次
    function once(event, handler) {
        // 定义新的回调函数 内部执行handler 同时执行完后将自己从事件的回调序列中取出
        let callback = function(...args) {
            handler.apply(this, args);
            events[event].splice(events[event].indexOf(callback), 1);
        }
        if (events.hasOwnProperty(event)) {
            events[event].push(callback);
        } else {
            events[event] = [callback];
        }
    }

    // 触发事件
    function emit(event, ...args) {
        if (events.hasOwnProperty(event)) {
            events[event].forEach(cb => cb(args));
        } else {
            throw new Error(`${event} is not a valid Event`);
        }
    }

    // 清除事件
    function clear(event) {
        if (events.hasOwnProperty(event)) {
            events[event] = null;
            delete events[event];
        } else {
            throw new Error(`${event} is not a valid Event`);
        }
    }

    return {on, once, emit, clear};
}


let event = new EventEmiter();

function sayHi() {
    console.log('hi');
}

function sayName(name) {
    console.log(name);
}

event.on('say', sayHi);

event.emit('say');

event.once('say', sayName);

event.emit('say', 'reaper');

event.emit('say');

event.clear('say');

event.emit('say'); //Error