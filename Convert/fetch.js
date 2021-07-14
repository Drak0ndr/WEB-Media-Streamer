fetch('http://localhost:3333', {
        headers: {
            'Content-Type': 'text/plain'
        }
    })
    .then(res => {
        res.json().then(data => {
            console.log(data)
        })
    })
