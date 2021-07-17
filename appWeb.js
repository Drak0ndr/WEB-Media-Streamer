var fs = require('fs')
var http = require('http')
var img = 'powered by Drakondr'
var oldImg = ''
var sysState = {}
const {
	exec
} = require("child_process")
const si = require('systeminformation')



const WebSocket = require('ws');

var wsServer = new WebSocket.Server({
	port: 9000
});

wsServer.on('connection', onConnect);

function onConnect(wsClient) {
	console.log('Новый пользователь');
	//updateImg()
	//console.log(wsServer.clients)
	// отправка приветственного сообщения клиенту
	//wsClient.send('Привет');
	wsServer.clients.forEach(client => {
		client.send(img)
	})
	wsClient.on('message', function (message) {
		/* обработчик сообщений от клиента */
		console.log(`client message: ${message}`)
	})
	wsClient.on('close', function () {
		// отправка уведомления в консоль
		console.log('Пользователь отключился');
	})
}



http.createServer(function (req, res) {
	res.writeHead(200, {
		'Content-Type': 'text/plain',
		'Access-Control-Allow-Origin': '*'
	});
	res.end(JSON.stringify(sysState));
}).listen(3001, '0.0.0.0')

http.createServer(function (req, res) {
	res.writeHead(200, {
		'Content-Type': 'text/plain',
		'Access-Control-Allow-Origin': '*'
	});

	let body = ''
	req.on('data', chunk => {
		body += chunk.toString()
	})
	req.on('end', () => {
		//console.time('json')
		//fs.writeFileSync('sysState.json', body);
		//console.timeEnd('json')
		console.log(body)
		res.end('ok')
	})
	//console.log('request')
}).listen(3256, '0.0.0.0')

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
	//console.log(sysState)
	sysBroadcast(sysState)
}
var telUpdate = setInterval(updateSysState, 1000)

function updateImg() {
	console.time('updateImg')
	//console.time('photo')
	exec("fswebcam -r 640x360 --no-banner Test.jpg", () => {})
	//console.timeEnd('photo')
	//console.time('image')
	//console.time('read')
	img = JSON.stringify(fs.readFileSync('Test.jpg', 'base64'))
	//console.timeEnd('read')
	//console.time('send')
	imgBroadcast(img)
	//console.timeEnd('send')
	//console.timeEnd('image')
	//console.log('update')
	//console.log('img')
	console.timeEnd('updateImg')
	setTimeout(updateImg, 0)

}
updateImg()

function imgBroadcast(image) {
	if (image != oldImg) {
		wsServer.clients.forEach(client => {
		client.send(image)
		oldImg = image
	})
	}

}

var wsServerSys = new WebSocket.Server({
	port: 9001
});

wsServerSys.on('connection', onConnect);

function sysBroadcast(sys) {
	wsServerSys.clients.forEach(client => {
		client.send(JSON.stringify(sys))
	})


}