var http = require('http');

http.createServer(function (req, res) {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end('<h1 style="color : red;">Hello World!</h1><h2>5711407056</h2><h2>กรวิชญ์ อินทรวัลณ์กูล</h2><hr><h1 style="color : blue;">Hi</h1><h2 style="color : yellow; background-color:dddddd;">5711403148 Kitipong  Sudcha</h2>');
}).listen(8080);
