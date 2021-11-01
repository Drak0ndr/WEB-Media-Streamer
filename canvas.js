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
    fetch('http://localhost:3603', {
        headers: {
            'Content-Type': 'text/plain'
        }
    })
        .then(res => {
            res.json().then(data => {
                speedy.textContent = `${data.speedy} м/с`
                draw()
            })
        })

}, 100)
let dir = 90
let canvk = {
    KeyX: false,
    KeyZ: false
}
document.addEventListener('keyup', e => {
    if (e.code == 'ArrowLeft') {
        dir -= 45
    }
    if (e.code == 'ArrowRight') {
        dir += 45
    }
    if (e.code == 'ArrowUp') {
        dir += 90
    }
    if (e.code == 'ArrowDown') {
        dir -= 90
    }
    if (e.code == 'KeyX') {
        canvk.KeyX = false
    }
    if (e.code == 'KeyZ') {
        canvk.KeyZ = false
    }
})
document.addEventListener('keydown', e => {
    if (e.code == 'KeyX') {
        canvk.KeyX = true
    }
    if (e.code == 'KeyZ') {
        canvk.KeyZ = true
    }
})
let canvt = setInterval(function () {
    sp = +speedy.textContent.replace(' м/с', '')
    if (dir == 0) {
        dir = 360
    }
    if (dir < 0) {
        dir += 360
    }
    if (dir > 360) {
        dir = dir - 360
    }
    if (canvk.KeyX && dir == 90) {
        yp -= sp * 1000 / 10
    }
    if (canvk.KeyZ && dir == 90) {
        yp += sp * 1000 / 10
    }
    if (canvk.KeyX && dir == 45) {
        yp -= (sp * 1000 / 10) / Math.sqrt(2)
        xp -= (sp * 1000 / 10) / Math.sqrt(2)
    }
    if (canvk.KeyZ && dir == 45) {
        yp += (sp * 1000 / 10) / Math.sqrt(2)
        xp += (sp * 1000 / 10) / Math.sqrt(2)
    }
    if (canvk.KeyX && dir == 135) {
        yp -= (sp * 1000 / 10) / Math.sqrt(2)
        xp += (sp * 1000 / 10) / Math.sqrt(2)
    }
    if (canvk.KeyZ && dir == 135) {
        yp += (sp * 1000 / 10) / Math.sqrt(2)
        xp -= (sp * 1000 / 10) / Math.sqrt(2)
    }
    if (canvk.KeyX && dir == 360) {
        xp -= sp * 1000 / 10
    }
    if (canvk.KeyZ && dir == 360) {
        xp += sp * 1000 / 10
    }
    if (canvk.KeyX && dir == 180) {
        xp += sp * 1000 / 10
    }
    if (canvk.KeyZ && dir == 180) {
        xp -= sp * 1000 / 10
    }
    if (canvk.KeyX && dir == 360 - 45) {
        yp += (sp * 1000 / 10) / Math.sqrt(2)
        xp -= (sp * 1000 / 10) / Math.sqrt(2)
    }
    if (canvk.KeyZ && dir == 360 - 45) {
        yp -= (sp * 1000 / 10) / Math.sqrt(2)
        xp += (sp * 1000 / 10) / Math.sqrt(2)
    }
    if (canvk.KeyX && dir == 180 + 45) {
        yp += (sp * 1000 / 10) / Math.sqrt(2)
        xp += (sp * 1000 / 10) / Math.sqrt(2)
    }
    if (canvk.KeyZ && dir == 180 + 45) {
        yp -= (sp * 1000 / 10) / Math.sqrt(2)
        xp -= (sp * 1000 / 10) / Math.sqrt(2)
    }
    if (canvk.KeyX && dir == 180 + 90) {
        yp += (sp * 1000 / 10)
    }
    if (canvk.KeyZ && dir == 180 + 90) {
        yp -= (sp * 1000 / 10)
    }
    draw()
}, 100)