//写入node缓存区
// buf.write(string[, offset[, length]][, encoding])
/**
 * 参数
 *参数描述如下：
 *string - 写入缓冲区的字符串。
 *offset - 缓冲区开始写入的索引值，默认为 0 。
 *length - 写入的字节数，默认为 buffer.length
 *encoding - 使用的编码。默认为 'utf8' 。
 * ** */

//创建一个长度为256 并且用0填充的buffer
let buf = Buffer.alloc(256);
//写入node缓存区
let len = buf.write('www.runoob.com')
console.log("写入字节数 : " + len)

//从缓存区读取
// buf.toString([encoding[, start[, end]]])
/**
 * 参数
 *参数描述如下：
 *encoding - 使用的编码。默认为 'utf8' 。
 *start - 指定开始读取的索引位置，默认为 0。
 *length - 写入的字节数，默认为 buffer.length
 *end - 结束位置，默认为缓冲区的末尾。
 * ** */
console.log(buf.toString()); //www.runoob.com

//将buf转化为 json 对象

