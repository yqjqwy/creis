let events = require('events');
let eventEmitter = new events.EventEmitter();

//监听器 1
let listener1 = function listener1() {
    console.log('监听器1执行')
};

//监听器2
let listener2 = function listener2() {
    console.log('监听器2执行')
}

//绑定connection事件 处理函数为 listener1
eventEmitter.addListener('connection', listener1);

//绑定connection事件 处理函数为 listener2
eventEmitter.on('connection', listener1);

//调用事件查询绑定数量的时候  不用实例化事件
let eventListeners = events.EventEmitter.listenerCount(eventEmitter, 'connection');
console.log(eventListeners + ' 个监听器监听连接事件。');

//处理connection事件 触发事件进行
eventEmitter.emit('connection');

//移除listener1
eventEmitter.removeListener('connection', listener1);
console.log('listener1 不再受监听。')

//触发事件、
eventEmitter.emit('connection');

eventListeners = events.EventEmitter.listenerCount(eventEmitter, 'connection');
console.log(eventListeners + ' 个监听器监听连接事件。');

console.log('程序执行完毕')

// eventEmitter.emit('error'); 

//疑问 : on和addListener有什么区别
//源码 EventEmitter.prototype.on = EventEmitter.prototype.addListener;
//即： 没有任何区别