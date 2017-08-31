var http = require('http');

http.createServer(function (req, res) {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end('<h1>Hello World!</h1><h2>5711407056</h2><h2>กรวิชญ์ อินทรวัลณ์กูล</h2>');
}).listen(8080);
