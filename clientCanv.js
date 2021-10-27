let socket = new WebSocket('ws://localhost:9000');
let fps = 0
const img = document.querySelector('.raspImg')
let base = 0
const cpuTemp = document.querySelector('.cpuTemp')
const charg = document.querySelector('.charg')
const speed = document.querySelector('.speedStatus')
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
    //console.log(`[message] Данные получены с сервера:`);
    fps++
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
      // alert('Произошла ошибка, перезагрузите страницу')
      //   window.location.reload()

      
      socket = new WebSocket('ws://localhost:9000');
      deadHand()
    }
  };

  socket.onerror = function (error) {
    console.log(`[error] ${error.message}`);
  };
}
deadHand()

let sysSocket = new WebSocket('ws://localhost:9001');


function deadHandSys() {
  sysSocket.onopen = function (e) {

  };

  sysSocket.onmessage = function (event) {
    let sysState = JSON.parse(event.data)
    //console.log(sysState);
            if (sysState.cpuTemp == null || sysState.cpuTemp == undefined) {
              sysState.cpuTemp = '...'
        } else {
          sysState.cpuTemp = +sysState.cpuTemp.toFixed(1)
        }
        if (sysState.battery == null || sysState.battery == undefined) {
          sysState.battery = '...'
        }
        console.log(fps)
        fps = 0
        updateState(sysState)
  };

  sysSocket.onclose = function (event) {
    if (event.wasClean) {
      console.log(`[close] Соединение закрыто чисто, код=${event.code} причина=${event.reason}`);
    } else {
      // например, сервер убил процесс или сеть недоступна
      // обычно в этом случае event.code 1006
      console.log('[close] Соединение прервано');
      socket = new WebSocket('ws://localhost:9001');
      deadHandSys()
    }
  };

  socket.onerror = function (error) {
    console.log(`[error] ${error.message}`);
  };
}
deadHandSys()

// let sysTime = setInterval(() => {
//   fetch('http://localhost:3001', {
//       headers: {
//         'Content-Type': 'text/plain'
//       }
//     })
//     .then(res => {
//       res.json().then(data => {
//         console.log(data)
//         if (data.cpuTemp == null || data.cpuTemp == undefined) {
//           data.cpuTemp = '...'
//         } else {
//           data.cpuTemp = +data.cpuTemp.toFixed(1)
//         }
//         if (data.battery == null || data.battery == undefined) {
//           data.battery = '...'
//         }
//         updateState(data)
//       })
//     })
// }, 2000)