const joystickPs = document.querySelectorAll('p')
joystickPs.forEach(item => {
    item.setAttribute("data-Key", `Key${item.textContent}`)
})

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
        sysState.keys[e.code] = true
    } else {
        sysState.keys[e.code] = false
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