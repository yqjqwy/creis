let events = require('events');

let eventEmitter = new events.EventEmitter();

eventEmitter.on('someEvent', function (arg1, arg2) {
    console.log('lis1', arg1, arg2)
})

eventEmitter.on('someEvent', function (arg1, arg2) {
    console.log('lis2', arg1, arg2)
})

eventEmitter.emit('someEvent', '参数1', '参数2');

/**
 * 笔记
 * 1.EventEmitter的每个事件由一个事件名称和若干参数组成，事件名是字符串（语义化）
 * 2.对于每个事件 EventEmitter 支持若干个事件监听器 
 *    当事件触发时，注册到这个事件的事件监听器会被依次调用，事件参数作为回调函数参数进行传递
 * 3.上述例子详解 : 
 *    eventEmitter为事件someEvent注册了两个时间监听器，当触发事件时，两个监听器依次被调用，
 *   
 * 4. eventEmitter 提供了多个属性，如 on和emit  
 *      on函数用于绑定事件函数
 *      emit属性用于触发事件
 * ** */