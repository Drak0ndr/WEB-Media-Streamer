var fs = require('fs')
var http = require('http')
var img = 'powered by Drakondr'
var sysState = {}
const si = require('systeminformation')
var update = setInterval(function() {
img = JSON.stringify(fs.readFileSync('Test.webm', 'base64'))
console.log(img)
//console.log('update')
},1000)


http.createServer(function(req, res) {
	res.writeHead(200, { 
		'Content-Type': 'text/plain',
		'Access-Control-Allow-Origin': '*'
	});
  	res.end(img);
	//console.log('request')
}).listen(3000, '0.0.0.0')

http.createServer(function(req, res) {
	res.writeHead(200, { 
		'Content-Type': 'text/plain',
		'Access-Control-Allow-Origin': '*'
	});
  	res.end(JSON.stringify(sysState));
}).listen(3001, '0.0.0.0')
console.log('Сервер работает')
function updateSysState() {
	si.battery()
  .then(data => {
	sysState.battery = data.percent
	//console.log(sysState)
	//console.log(data)
	})

	si.cpuTemperature()
  .then(data => {
	  sysState.cpuTemp = data.main
	  //console.log(data)
	})
	console.log(sysState)
}
updateSysState()
var telUpdate = setInterval(updateSysState, 1000)