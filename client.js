const img = document.querySelector('.RaspImg')
let base = 0
// http://localhost:3000
//http://b057f142b254.ngrok.io/
//http://192.168.1.41:3000
let time = setInterval(() => {
    fetch('http://172.16.1.87:3000', {
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
