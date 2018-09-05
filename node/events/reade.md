EventEmitter 属性方法简介 :
一、方法

1.addListener(event,listener) -- 为指定的事件添加一个监听器到监听器数组的尾部';

2.on(event,listener) --- 为指定事件注册一个监听器，接受一个字符串event和回调函数
    server.on('connection', function (stream) {
        console.log('someone connected!');
    });

3.once(event,listener) --- 为指定事件注册一个单次监听器 即：只会触发一次
    server.once('connection', function (stream) {
        console.log('Ah, we have our first user!');
    });

4.removeListener(event, listener) --- 移除指定事件的某个监听器，监听器必须是该事件已经注册的监听器 它接受两个参数，第一个是事件名称，第二个是回调函数名称
eg : 
    var callback = function(stream) {
        console.log('someone connected!');
    };
    server.on('connection', callback);

    server.removeListener('connection', callback);

5.removeAllListeners([event]) --- 移除所有的监听器 如果指定事件 则移除指定事件的所有监听器

6.setMaxListeners(n) --- 默认情况下， EventEmitters 如果你添加的监听器超过 10 个就会输出警告信息。 setMaxListeners 函数用于提高监听器的默认限制的数量。

7.listeners(event) --- 返回指定事件的监听器数组。

8.emit(event, [arg1], [arg2], [...]) --- 按参数的顺序执行每个监听器，如果事件有注册监听返回 true，否则返回 false。

二、类方法

1.listenerCount(emitter, event) --- 返回指定事件的监听器数量。

三、事件

1.newListener --- 该事件在添加新的监听器时被触发
    1>event - 字符串，事件名称
    2>listener - 处理事件函数

2.removeListener --- 从指定监听器数组中删除一个监听器。需要注意的是，此操作将会改变处于被删监听器之后的那些监听器的索引。
    1>event - 字符串，事件名称
    2>listener - 处理事件函数