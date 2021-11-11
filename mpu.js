var i2c = require('i2c-bus');
const http = require('http')
var MPU6050 = require('i2c-mpu6050');
const Gpio = require('pigpio').Gpio;
const abc = new Gpio(14, {mode: Gpio.INPUT});
var data =0
let f = 0.99
var address = 0x68;
var i2c1 = i2c.openSync(1);
var sensor = new MPU6050(i2c1, address);
let fz = 0
let fx = 0
let fy = 0
let lx = 0
let ly = 0
let lz = 0
let l = 0.0398 * Math.PI
let u = 0
let send = {}
let gg = true
const g = 9.81
let t = 100
let oldDate = new Date()
let rotation = {}
http.createServer(function (req, res) {
	res.writeHead(200, {
		'Content-Type': 'text/plain',
		'Access-Control-Allow-Origin': '*'
	});

		res.end(send)
}).listen(3603, '0.0.0.0')
function degtorad(deg) {
	return deg * Math.PI/180
}
setInterval(() => {
data = sensor.readSync();
// console.log(data);
fz+= (data.gyro.z-1.1) * t/1000
fx += (data.gyro.x+3.6) * t/1000
fy += (data.gyro.y+0.33) * t/1000
rotation.z = fz
rotation.x = fx
rotation.y = fy
console.log('rotation')
console.log(data.rotation)
console.log(rotation)
	if(abc.digitalRead()) {
	if(data.rotation.x >= 0 && rotation.z < 80) {
		ly += l * Math.cos(degtorad(data.rotation.x)) * Math.cos(degtorad(90 - rotation.z))
		lx += l * Math.cos(degtorad(data.rotation.x)) * Math.cos(degtorad(rotation.z))
		lz += l * Math.cos(degtorad(90 - data.rotation.x)) * Math.cos(degtorad(rotation.z))
	}
	if(rotation.z > 80 && rotation.z < 100 && gg){
		rotation.x = 0
		gg = false
	}
	if(rotation.z > 80 && rotation.z < 100 && rotation.x > -10 && rotation.x < 10) {
		ly += l
	}
	if(rotation.x > 10 && rotation.x < 80) {
		ly += l * Math.cos(degtorad(rotation.x))
		lx -= l * Math.cos(degtorad(90 - rotation.x))
	}
	if(rotation.x > 80 && rotation.x < 100) {
		lx-= l
	}
	if(rotation.x > 100 && rotation.x < 160) {
		lx -= l * Math.cos(degtorad(rotation.x - 90))
		ly -= l * Math.cos(degtorad(90 - (rotation.x - 90)))
	}
	if(rotation.x > 160 && rotation.x <200) {
	ly -= l
	}
	u = l/((new Date() - oldDate)/1000)
	oldDate = new Date()
}
console.log(u + 'm/s')
send.u = u
send.lx = lx
send.ly = ly
},t)





