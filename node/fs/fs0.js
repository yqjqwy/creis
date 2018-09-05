let fs = require('fs');
//阻塞实例 --- 按照顺序执行
// let data = fs.readFileSync('input.txt');

// console.log(data);


//非阻塞实例 --- 不按顺序  走回调。
fs.readFile('input.txt', function (err, data) {
    if (err) return console.error(err);
    console.log(data.toString());
});

/**
 * 四种情况 
 * 1.同步，阻塞
 * 2.同步，非阻塞
 * 3.异步，阻塞
 * 4.异步，非阻塞
 * * */

//异步往往搭配非阻塞

// console.log(data.toString());
console.log('程序执行结束')