let socket = new WebSocket('ws://localhost:9000');

const img = document.querySelector('.raspImg')
let base = 0
let mediaTime = 40
const cpuTemp = document.querySelector('.cpuTemp')
const charg = document.querySelector('.charg')
var context = img.getContext('2d');
var imgCanv = new Image()
img.width = (innerWidth / 100 * 85 / 100 * 80)
console.log(innerWidth / 100 * 85 / 100 * 80)
img.height = (innerHeight / 100 * 70)
console.log(innerHeight)

function updateState(obj) {
  cpuTemp.textContent = `${obj.cpuTemp}℃`
  charg.textContent = `${obj.battery}%`
}

function deadHand() {
  socket.onopen = function (e) {
    console.log("[open] Соединение установлено");
    console.log("Отправляем данные на сервер");
    socket.send("Меня зовут Джон");
  };

  socket.onmessage = function (event) {
    console.log(`[message] Данные получены с сервера: ${event.data}`);

    //console.log(data2)

    base = event.data.replaceAll('"', '')
    //console.log(base)
    imgCanv.onload = function() {
        
        context.drawImage(imgCanv,0,0,img.width, img.height)
        
    }
    imgCanv.src = `data:image/jpeg;base64,${base}`
  };

  socket.onclose = function (event) {
    if (event.wasClean) {
      console.log(`[close] Соединение закрыто чисто, код=${event.code} причина=${event.reason}`);
    } else {
      // например, сервер убил процесс или сеть недоступна
      // обычно в этом случае event.code 1006
      console.log('[close] Соединение прервано');
      socket = new WebSocket('ws://localhost:9000');
      deadHand()
    }
  };

  socket.onerror = function (error) {
    console.log(`[error] ${error.message}`);
  };
}
deadHand()

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
        if (data.battery == null || data.battery == undefined) {
          data.battery = '...'
        }
        updateState(data)
      })
    })
}, 2000)