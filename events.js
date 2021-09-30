const joystickPs = document.querySelectorAll('p')
let docKeys = {}
const down = ['KeyY', 'Key3', 'KeyQ', 'KeyO']
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
        Key3: false,
        KeyO: false,
        KeyQ: false
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
        // if(docKeys[e.code.replace('Numpad', 'Key')].getAttribute('data-Down')) {

        // }
        if(e.code != 'KeyY' && e.code != 'Numpad3' && e.code != 'KeyQ' && e.code != 'KeyO') {
            docKeys[e.code.replace('Numpad', 'Key')].style.backgroundColor = '#6d6d6d'
            sysState.keys[e.code.replace('Numpad', 'Key')] = true
        }

    } else {
        if(docKeys[e.code.replace('Numpad', 'Key')].getAttribute('data-Down')) {
            sysState.keys[e.code.replace('Numpad', 'Key')] = !sysState.keys[e.code.replace('Numpad', 'Key')]
            if(sysState.keys[e.code.replace('Numpad', 'Key')]) {
                docKeys[e.code.replace('Numpad', 'Key')].style.backgroundColor = '#6d6d6d'
            } else {
                docKeys[e.code.replace('Numpad', 'Key')].style.backgroundColor = ''
            }
        } else {
            docKeys[e.code.replace('Numpad', 'Key')].style.backgroundColor = ''
            sysState.keys[e.code.replace('Numpad', 'Key')] = false
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