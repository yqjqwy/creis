//缓冲区比较
let buf1 = Buffer.from('111');
let buf2 = Buffer.from('abcde');

let result = buf1.compare(buf2);
console.log(result)
if (result < 0) {
    console.log(buf1 + " 在 " + buf2 + "之前");
} else if (result == 0) {
    console.log(buf1 + " 与 " + buf2 + "相同");
} else {
    console.log(buf1 + " 在 " + buf2 + "之后");
}

//缓冲区拷贝
//将 buf1 插入到 buf2 指定位置上
buf1.copy(buf2);
console.log(buf1.toString());
console.log(buf2.toString());

//注意： 拷贝的时候 需要插入的地方有多少占位符 就会拷贝多少进去