//缓冲区拷贝 --- copy
/***
 * buf.copy(targetBuffer[, targetStart[, sourceStart[, sourceEnd]]])
 * targetBuffer:要拷贝的对象
 * targetStart:插入的位置
 * sourceStart:开始的位置
 * sourceEnd:结束的位置
 * * */

let buf1 = Buffer.from('abcdefghijkl');
let buf2 = Buffer.from('RUNOOB');
let buf3 = Buffer.from('12345567890');

//将 buf2 插入到 buf1 指定位置上
buf2.copy(buf1, 2);

console.log(buf1.toString());
console.log(buf2.toString());

//缓冲区剪裁 --- slice
/**
 * buf.slice([start[, end]])
 * start:起始位置
 * end:终止位置
 * * */
let buf4 = buf3.slice(1, 3);
console.log('裁剪后的结果为' + buf4)

//缓冲区长度 --- length
console.log('缓冲区长度' + buf4.length)