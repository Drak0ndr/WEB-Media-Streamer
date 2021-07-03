var fs = require('fs')
var http = require('http')

var img = JSON.stringify(fs.readFileSync('arizona.jpg', 'base64'))

http.createServer(function(req, res) {
	res.writeHead(200, { 
		'Content-Type': 'text/plain',
		'Access-Control-Allow-Origin': '*'
	});
  	res.end(img);
	console.log('img')
}).listen(3000, '0.0.0.0')
console.log('Сервер работает')