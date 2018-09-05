//post部分 --- 解析请求体
let http = require('http');
let queryString = require('querystring');
let util = require('util');

let postHTML =
    '<html><head><meta charset="utf-8"><title>菜鸟教程 Node.js 实例</title></head>' +
    '<body>' +
    '<form method="post">' +
    '网站名： <input name="name"><br>' +
    '网站 URL： <input name="url"><br>' +
    '<input type="submit">' +
    '</form>' +
    '</body></html>';

http.createServer((req, res) => {
    //定义post变量 暂存请求体的信息
    let post = '';

    //通过req的data事件监听函数 每当接受到请求体的数据 就累加到post变量中
    req.on('data', (chunk) => {
        post += chunk;
    });

    //在end事件触发后 通过quertstring.parse将post解析为真正的post请求格式 然后想客户端返回
    req.on('end', () => {
        console.log(post)
        //解析参数
        post = queryString.parse(post);
        console.log(post)

        // 设置响应头部信息及编码
        res.writeHead(200, {
            'Content-Type': 'text/html; charset=utf8'
        });

        if (post.name && post.url) { // 输出提交的数据
            res.write("网站名：" + post.name);
            res.write("<br>");
            res.write("网站 URL：" + post.url);
        } else { // 输出表单
            res.write(postHTML);
        }

        res.end();
    })

}).listen(3000)