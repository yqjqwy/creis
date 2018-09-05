let buf1 = Buffer.from('教程');
let buf2 = Buffer.from('node');
// 缓冲区合并  Buffer.concat(list[, totalLength])
// list - 用于合并的 Buffer 对象数组列表。
// totalLength - 指定合并后Buffer对象的总长度。

//读取缓存
console.log(buf1.toString()+ '---' + buf2.toString())

let buf3 = Buffer.concat([buf1, buf2]);
console.log("buf3 内容: " + buf3.toString());