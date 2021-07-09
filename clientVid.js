const img = document.querySelector('.raspImg')
let base = 0
const cpuTemp = document.querySelector('.cpuTemp')
const charg = document.querySelector('.charg')
const memUse = document.querySelector('.memUse')
// http://localhost:3000
//http://172.16.1.87:3000
//http://192.168.1.41:3000

function updateState(obj) {
    cpuTemp.textContent = `${obj.cpuTemp}℃`
    charg.textContent = `${obj.battery}%`
}

let time = setInterval(() => {
    fetch('http://localhost:3000', {
        headers: {
            'Content-Type': 'text/plain'
        }
    })
        .then(res => {
            //console.log(res)
            res.text().then(data2 => {
                //console.log(data2)
                base = data2.replaceAll('"', '')
                //console.log(base)
                img.src = `data:video/webm;base64,${base}`
            })
        })
},1000)

let sysTime = setInterval(() => {
    fetch('http://localhost:3001', {
        headers: {
            'Content-Type': 'text/plain'
        }
    })
        .then(res => {
            res.json().then(data => {
                console.log(data)
				if (data.cpuTemp == null) {
					data.cpuTemp = '...'
				}
				updateState(data)
            })
        })
},1000)