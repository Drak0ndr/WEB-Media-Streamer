const http = require('http')

const keys = [['W', 'S'], ['A', 'D'], ['Q', 'E']]
const pins = {
    KeyW: 'Www',
    KeyS: 'Sss',
    KeyA: 'A',
    KeyD: 'D',
    KeyQ: 'Q',
    KeyE: 'E'
}
function pinKey(key1, val1, key2, val2) {
    console.log(key1, val1, key2, val2)
    if(val1 && val2) {
        console.log('не работает так')
    } else if (val1 || val2) {
        if(val1) {
            console.log(pins[`Key${key1}`])
        }
        if(val2) {
            console.log(pins[`Key${key2}`])
        }
    } else {
        console.log('ничего нет')
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
        body = JSON.parse(body)
        keys.forEach(item => {
            if(item.length == 2) {
                pinKey(item[0], body[`Key${item[0]}`], item[1], body[`Key${item[1]}`])
            }
        })
		res.end('ok')
	})
}).listen(3256, '0.0.0.0')