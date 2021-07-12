const camControls = document.querySelectorAll('.videoControl')

let sysState = {
    camDir: 0
}

camControls.forEach(item => {
    item.addEventListener('mouseenter', event => {
        if(event.target.classList.contains('videoControl')) {
            sysState.camDir = event.target.dataset.dir
            console.log(sysState)
            fetchState()
        }
    })

    item.addEventListener('mouseleave', event => {
        sysState.camDir = 0
        console.log(sysState)
        fetchState()
    })
})

function fetchState() {
    fetch('http://localhost:3256', {
        method: 'POST',
        headers: {
            'Content-Type': 'text/plain'
        },
        body: JSON.stringify(sysState)
    })
}