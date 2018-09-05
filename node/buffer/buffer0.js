/**
 * buffer : 一般用于表示编码字符的序列 如 : utf-8 Ucs2 Base64 或十六进制编码的数据
 * 通过使用显式的字符编码就可以在buffer实例与普通的js字符串之间进行相互转换
 * * */

const buf = Buffer.from('runoob', 'ascii');

//进行转码
//72756e6f6f62
console.log(buf.toString('hex'));

//cnVub29i
console.log(buf.toString('base64'))

/**
 * 支持的字符编码：
 * ascii:仅支持 7 位 ASCII 数据。如果设置去掉高位的话，这种编码是非常快的。
 * utf8:多字节编码的 Unicode 字符。许多网页和其他文档格式都使用 UTF-8 。
 * utf16le:2 或 4 个字节，小字节序编码的 Unicode 字符。支持代理对（U+10000 至 U+10FFFF）。
 * ucs2 - utf16le 的别名。
 * base64 - Base64 编码。
 * latin1 - 一种把 Buffer 编码成一字节编码的字符串的方式。
 * binary - latin1 的别名。
 * hex - 将每个字节编码为两个十六进制字符。
 * * */