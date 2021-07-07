var fs = require('fs')
var http = require('http')
var img = 'powered by Drakondr'
var sysState = {}
const si = require('systeminformation')
var update = setInterval(function() {
img = JSON.stringify(fs.readFileSync('Test.jpg', 'base64'))
//console.log('update')
},40)


http.createServer(function(req, res) {
	res.writeHead(200, { 
		'Content-Type': 'text/plain',
		'Access-Control-Allow-Origin': '*'
	});
  	res.end(img);
	//console.log('request')
}).listen(3000, '0.0.0.0')
console.log('Сервер работает')
si.battery()
  .then(data => {
	//sysState.battery = data.persent
	console.log(data)
	})

  si.cpuTemperature()
  .then(data => console.log(data))