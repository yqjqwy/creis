let express = require('express');
let app = express();

//request 和 response 对象来处理请求和响应的数据
app.get('/', (erq, res) => {
    res.send('Hello world')
});

let server = app.listen(8081, () => {
    let host = server.address().address;
    let port = server.address().port;
    console.log("应用实例，访问地址为 http://127.0.0.1:8081", host, port)
});

//疑问1： 前台路由和后台路由有什么区别  后台路由和url地址有什么区别
/**
 * 答案： 前台路由本身就是仿照后台路由写的  前台路由是按照锚点或者vue中刷新js实现
 * 后台路由是实实在在返回的特定的页面。  
 * 并且后台路由就是url地址
 * ** */