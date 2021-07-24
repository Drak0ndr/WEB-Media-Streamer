const joystickPs = document.querySelectorAll('p')
let docKeys = {}
const down = ['KeyY', 'Key3']
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
        KeyY: false,
        Numpad3: false
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

        }
        if(e.code != 'KeyY' && e.code != 'Numpad3') {
            docKeys[e.code.replace('Numpad', 'Key')].style.backgroundColor = '#6d6d6d'
            sysState.keys[e.code] = true
        }

    } else {
        if(docKeys[e.code.replace('Numpad', 'Key')].getAttribute('data-Down')) {
            sysState.keys[e.code] = !sysState.keys[e.code]
            if(sysState.keys[e.code]) {
                docKeys[e.code.replace('Numpad', 'Key')].style.backgroundColor = '#6d6d6d'
            } else {
                docKeys[e.code.replace('Numpad', 'Key')].style.backgroundColor = ''
            }
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