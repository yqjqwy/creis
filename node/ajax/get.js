//get请求部分
let http = require('http');
let url = require('url');
let util = require('util');

http.createServer((req, res) => {
    res.writeHead(200, {
        'Content-Type': 'text/plain;charset=utf-8'
    });


    //解析url参数
    let params = url.parse(req.url, true).query;
    console.log(params)
    res.write('网站名', params.name);
    res.write('\n');
    res.write('网站名' + params.url);
    //util.inspect --- 将任意对象转换为字符串
    // res.end(util.inspect(url.parse(req.url, true)));
    res.end();
}).listen(3000);