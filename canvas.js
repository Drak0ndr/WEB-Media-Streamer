const canv = document.querySelector('.gps')
const ctx = canv.getContext('2d')
const speedy = document.querySelector('.speedStatus')
canv.width = innerWidth / 100 * 15
canv.height = innerWidth / 100 * 20
let mm = innerWidth / 100 * 15 / 1850
console.log(mm, canv.height / mm)
let sp = 0
let xp = 0
let yp = 0
function draw() {
    ctx.fillStyle = 'white'
    ctx.fillRect(0, 0, canv.width, canv.height)
    ctx.fillStyle = 'black'
    ctx.beginPath();
    ctx.strokeStyle = 'black'
    ctx.moveTo(530 * mm + 20 * mm, 100 * mm);
    ctx.lineTo(530 * mm + 20 * mm + 750 * mm, 100 * mm)
    ctx.lineTo(2 * 530 * mm + 20 * mm + 750 * mm, 100 * mm + 530 * mm)
    ctx.lineTo(2 * 530 * mm + 20 * mm + 750 * mm, 100 * mm + 530 * mm + 1500 * mm)
    ctx.lineTo(20 * mm, 100 * mm + 530 * mm + 1500 * mm)
    ctx.lineTo(20 * mm, 100 * mm + 530 * mm)
    ctx.closePath()
    ctx.stroke()
    ctx.beginPath();
    ctx.moveTo(530 * mm + 20 * mm, 100 * mm);
    ctx.lineTo(530 * mm + 20 * mm, 100 * mm + 530 * mm + 1500 * mm)
    ctx.stroke();
    ctx.moveTo(530 * mm + 20 * mm + 750 * mm, 100 * mm);
    ctx.lineTo(530 * mm + 20 * mm + 750 * mm, 100 * mm + 530 * mm + 1500 * mm)
    ctx.stroke()
    ctx.moveTo(20 * mm, 100 * mm + 530 * mm)
    ctx.lineTo(2 * 530 * mm + 20 * mm + 750 * mm, 100 * mm + 530 * mm)
    ctx.stroke()
    ctx.closePath()
    ctx.beginPath();
    ctx.strokeStyle = 'blue'
    ctx.fillStyle = 'blue'
    ctx.moveTo(530 * mm + 20 * mm + 200 * mm + xp * mm, 100 * mm + 530 * mm + 1500 * mm - 200 * mm - 350 * mm + yp * mm)
    ctx.lineTo(530 * mm + 20 * mm + 200 * mm + 350 * mm + xp * mm, 100 * mm + 530 * mm + 1500 * mm - 200 * mm - 350 * mm + yp * mm)
    ctx.lineTo(530 * mm + 20 * mm + 200 * mm + 350 * mm + xp * mm, 100 * mm + 530 * mm + 1500 * mm - 200 * mm + yp * mm)
    ctx.lineTo(530 * mm + 20 * mm + 200 * mm + xp * mm, 100 * mm + 530 * mm + 1500 * mm - 200 * mm + yp * mm)
    ctx.lineTo(530 * mm + 20 * mm + 200 * mm + xp * mm, 100 * mm + 530 * mm + 1500 * mm - 200 * mm - 350 * mm + yp * mm)
    ctx.fill()
    ctx.closePath()
}
draw()

let gpTime = setInterval(() => {
    fetch('http://172.16.1.77:3603', {
        headers: {
            'Content-Type': 'text/plain'
        }
    })
        .then(res => {
            res.json().then(data => {
                speedy.textContent = `${data.u} м/с`
		    xp = -data.lx
		    yp = -data.ly
                draw()
            })
        })

}, 100)