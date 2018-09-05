let http = require('http');
let url = require('url');

function start(route) {
    function onRequest(request, response) {
        let pathname = url.parse(request.url).pathname;
        console.log('------------')
        console.log("路由名称" + pathname);

        route(pathname);

        response.writeHead(200, {
            'Content-Type': 'text/plain'
        });
        response.write('hello')
        response.end();
    }

    http.createServer(onRequest).listen(8888)
    console.log('启动服务')
}

exports.start = start;