//引入events模块
let events = require('events');
//创建eventsEmitter对象
let eventEmitter = new events.EventEmitter();

/**
 * 笔记
 * 当添加新的监听器时, newListener 事件会被触发 
 * 当监听器被移除的时候 removeListener 会被触发
 * * */

//添加事件触发的函数
eventEmitter.on('some_event', function () {
    console.log('some_event 事件触发')
})

//触发事件
setTimeout(function () {
    eventEmitter.emit('some_event')
}, 1000);

/**
 * 笔记
 * 原理: 实例化后的eventEmitter对象注册了事件some_event的一个监听器,
 *       然后通过向eventEmitter对象发送事件some_event,测试会调用some_event的监听器.
 * * */