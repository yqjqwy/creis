let events = require('events');
//创建eventEmitter对象
let eventEmitter = new events.EventEmitter();

//创建事件处理程序
let connectHandler = function connected() {
    console.log('连接成功');

    //触发data_recevied 事件
    eventEmitter.emit('data_received');
};

//绑定connection 事件处理程序
eventEmitter.on('connection', connectHandler);

//使用匿名函数绑定data_received 事件
eventEmitter.on('data_received', function () {
    console.log('数据接收成功')
})

//触发connection事件
eventEmitter.emit('connection');

/**
 * 笔记: 
 * 1.eventEmitter.emit('事件名称') --- 触发事件
 * 2.eventEmitter.on('事件名称') --- 绑定事件处理的函数
 * ** */

console.log('程序执行完毕')