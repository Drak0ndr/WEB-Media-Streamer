var fs = require('fs')
var http = require('http')
var img = 'powered by Drakondr'
var sysState = {}
const si = require('systeminformation')
 function updateImg() {
	//console.time('image')
	img =  JSON.stringify(fs.readFileSync('Test.jpg', 'base64'))
	//console.timeEnd('image')
	//console.log('update')

}
updateImg()


http.createServer(function(req, res) {
	console.time('serv')
	res.writeHead(200, { 
		'Content-Type': 'text/plain',
		'Access-Control-Allow-Origin': '*'
	});
		res.end(img)
		updateImg()
	  console.timeEnd('serv')
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