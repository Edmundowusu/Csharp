var http = require('http');
http.createServer(function (req, res) {
res.writeHead(200, {'Content-Type': 'text/html'});
res.end('Hello CPS*3500!');
}).listen(8080);
Save the file
Right-click on the file, open in Integrated Terminal
Type: node MyServer.js
