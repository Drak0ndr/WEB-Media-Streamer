const http = require('http')
const Gpio = require('pigpio').Gpio;
const keys = [['W', 'S'], ['A', 'D'], ['Q', 'E'], ['T', 'G'], ['F', 'H'],['Y'], ['I', 'K'], ['J', 'L'], ['8', '2'], ['4', '6'], ['3']]
const pins = {
    KeyW: new Gpio(14, {mode: Gpio.OUTPUT}),
    KeyS: new Gpio(15, {mode: Gpio.OUTPUT}),
    KeyA: new Gpio(18, {mode: Gpio.OUTPUT}),
    KeyD: new Gpio(23, {mode: Gpio.OUTPUT}),
    KeyQ: new Gpio(24, {mode: Gpio.OUTPUT}),
    KeyE: new Gpio(25, {mode: Gpio.OUTPUT}),
    KeyT: new Gpio(8, {mode: Gpio.OUTPUT}),
    KeyG: new Gpio(7, {mode: Gpio.OUTPUT}),
    KeyF: new Gpio(12, {mode: Gpio.OUTPUT}),
    KeyH: new Gpio(16, {mode: Gpio.OUTPUT}),
    KeyY: new Gpio(20, {mode: Gpio.OUTPUT}),
    KeyY_sub: new Gpio(26, {mode: Gpio.OUTPUT}),
    KeyI: new Gpio(21, {mode: Gpio.OUTPUT}),
    KeyK: new Gpio(2, {mode: Gpio.OUTPUT}),
    KeyJ: new Gpio(3, {mode: Gpio.OUTPUT}),
    KeyL: new Gpio(4, {mode: Gpio.OUTPUT}),
    Key8: new Gpio(17, {mode: Gpio.OUTPUT}),
    Key2: new Gpio(27, {mode: Gpio.OUTPUT}),
    Key4: new Gpio(22, {mode: Gpio.OUTPUT}),
    Key6: new Gpio(10, {mode: Gpio.OUTPUT}),
    Key3: new Gpio(9, {mode: Gpio.OUTPUT}),
    Key3_sub: new Gpio(11, {mode: Gpio.OUTPUT})
}

const motor1 = new Gpio(5, {mode: Gpio.OUTPUT});
const motor2 = new Gpio(6, {mode: Gpio.OUTPUT});
const open = 2500
const close = 500

let comandDate = new Date()

function panels(dir) {
    if(dir) {
        if(dir == 'open') {
            motor1.servoWrite(open)
            setTimeout(function() {motor2.servoWrite(open)}, 500)
            
        } else {
            motor1.servoWrite(close)
            setTimeout(function() {motor2.servoWrite(close)}, 500)
        }
    } else if((new Date() - comandDate) >= (1 * 60 * 1000)) {
        motor1.servoWrite(open)
        setTimeout(function() {motor2.servoWrite(open)}, 500)
    } else {
        motor1.servoWrite(close)
        setTimeout(function() {motor2.servoWrite(close)}, 500)
    }
}
setInterval(panels, 1000)

keys.forEach(item => {
    if(item.length == 2) {
        pinKey(item[0], false, item[1], false)
    }
})
function claw(key, val) {
    if(val) {
        pins[`Key${key}`].digitalWrite(1)
        pins[`Key${key}_sub`].digitalWrite(0)
        setTimeout(function() {pins[`Key${key}`].digitalWrite(0)}, 1000)
    } else {
        pins[`Key${key}`].digitalWrite(0)
        pins[`Key${key}_sub`].digitalWrite(1)
        setTimeout(function() {pins[`Key${key}_sub`].digitalWrite(0)}, 1000)
    }
    
}
function pinKey(keyOne, val1, keyTwo, val2) {
    console.log(keyOne, val1, keyTwo, val2)
    if(val1 && val2) {
        try {
            pins[`Key${keyOne}`].digitalWrite(0)
            pins[`Key${keyTwo}`].digitalWrite(0)
        }
        catch {
            
        }

    } else if (val1 || val2) {
        if(val1) {
            pins[`Key${keyOne}`].digitalWrite(1)
            pins[`Key${keyTwo}`].digitalWrite(0)
        }
        if(val2) {
            pins[`Key${keyOne}`].digitalWrite(0)
            pins[`Key${keyTwo}`].digitalWrite(1)
        }
    } else {
        pins[`Key${keyOne}`].digitalWrite(0)
        pins[`Key${keyTwo}`].digitalWrite(0)
    }
}

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
        comandDate = new Date()
        body = JSON.parse(body)
        console.time('time')
        keys.forEach(item => {
            if(item.length == 2) {
                pinKey(item[0], body[`Key${item[0]}`], item[1], body[`Key${item[1]}`])
            } else {
                claw(item[0], body[`Key${item[0]}`])
            }
        })
        console.timeEnd('time')
		res.end('ok')
	})
}).listen(3256, '0.0.0.0')