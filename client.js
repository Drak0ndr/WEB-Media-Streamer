const img = document.querySelector('.raspImg')
let base = 0
// http://localhost:3000
//http://172.16.1.87:3000
//http://192.168.1.41:3000
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
                img.style.backgroundImage = `url(data:image/jpeg;base64,${base})`
            })
        })
},40)
