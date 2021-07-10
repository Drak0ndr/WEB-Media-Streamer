const img = document.querySelector('.raspImg')
let base = 0
let mediaTime = 40
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
imgFetch()

function imgFetch() {
    fetch('http://localhost:3000', {
        headers: {
            'Content-Type': 'text/plain'
        }
    })
        .then(res => {
            //console.log(res)
            res.text().then(data2 => {
                if(data2 != 0) {
                //console.log(data2)
                
                base = data2.replaceAll('"', '')
                //console.log(base)
                img.style.backgroundImage = `url(data:image/jpeg;base64,${base})`
                
                } else {
                    console.log('0')
                }
                imgFetch()
            })
        })
}



let sysTime = setInterval(() => {
    fetch('http://localhost:3001', {
        headers: {
            'Content-Type': 'text/plain'
        }
    })
        .then(res => {
            res.json().then(data => {
                console.log(data)
				if (data.cpuTemp == null || data.cpuTemp == undefined) {
					data.cpuTemp = '...'
				} else {
                    data.cpuTemp = +data.cpuTemp.toFixed(1)
                }
                if(data.battery == null || data.battery == undefined) {
                    data.battery = '...'
                }
				updateState(data)
                imgFetch()
            })
        })
},2000)