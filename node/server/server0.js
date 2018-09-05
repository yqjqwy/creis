let http = require('http');

//创建服务
http.createServer(function (request, response) {
    //发送http头部
    //http状态值 200 OK
    //内容类型 ： text/plain
    response.writeHead(200, {
        'Content-Type': 'text/plain'
    });

    //发送相应数据 hello world
    response.end('Hello World\n')
}).listen(8888); //监听端口号

console.log('Sever Running at http://127.0.0.1:8888')