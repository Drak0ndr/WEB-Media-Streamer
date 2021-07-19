const joystickPs = document.querySelectorAll('p')
let docKeys = {}
const down = ['KeyR', 'KeyY', 'Key1', 'Key3']
joystickPs.forEach(item => {
    item.setAttribute("data-Key", `Key${item.textContent}`)
    down.forEach(num => {
        if(`Key${item.textContent}` == num) {
            item.setAttribute("data-Down", `true`)
        }
    })
    docKeys[`Key${item.textContent}`] = item
})
console.log(docKeys)

let sysState = {
    keys: {

    }
}

document.addEventListener('keydown', e => {
    changeKeys(e)
})

document.addEventListener('keyup', e => {
    changeKeys(e)
})

function changeKeys(e) {
    if(e.type == 'keydown') {
        if(docKeys[e.code.replace('Numpad', 'Key')].getAttribute('data-Down')) {
            if(e.code == 'KeyR') {
                docKeys.KeyY.style.backgroundColor = ''
                sysState.keys[e.code] = true
                sysState.keys.KeyY = false
            }
            if(e.code == 'KeyY') {
                docKeys.KeyR.style.backgroundColor = ''
                sysState.keys[e.code] = true
                sysState.keys.KeyR = false
            }
            if(e.code.replace('Numpad', 'Key') == 'Key1') {
                docKeys.Key3.style.backgroundColor = ''
                sysState.keys[e.code] = true
                sysState.keys.Numpad3 = false
            }
            if(e.code.replace('Numpad', 'Key') == 'Key3') {
                docKeys.Key1.style.backgroundColor = ''
                sysState.keys[e.code] = true
                sysState.keys.Numpad1 = false
            }
        }
        docKeys[e.code.replace('Numpad', 'Key')].style.backgroundColor = '#6d6d6d'
        sysState.keys[e.code] = true
    } else {
        if(docKeys[e.code.replace('Numpad', 'Key')].getAttribute('data-Down')) {

        } else {
            docKeys[e.code.replace('Numpad', 'Key')].style.backgroundColor = ''
            sysState.keys[e.code] = false
        }

    }
    console.log(sysState.keys)
    fetchState()
}

function fetchState() {
    fetch('http://localhost:3256', {
        method: 'POST',
        headers: {
            'Content-Type': 'text/plain'
        },
        body: JSON.stringify(sysState.keys)
    })
}