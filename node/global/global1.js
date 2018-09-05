//_filename --- 表示当前正在执行的脚本的文件名,返回文件所在位置的绝对路径
console.log(__filename)
//D:\workspace\node\main.js --- 绝对路径(包含文件名)

//__dirname --- 表示当前执行脚本所在的目录。(不包含文件名)
console.log(__dirname);

//console对象
console.info('程序开始执行');

let counter = 10;
console.log('计数'+counter)

console.time('获取数据')

console.timeEnd('获取数据')

console.info('程序执行完毕')