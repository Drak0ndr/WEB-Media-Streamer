const canv = document.querySelector('.gps')
const ctx = canv.getContext('2d')
canv.width = innerWidth /100 *15
canv.height = innerWidth/100 *20
mm = innerWidth /100 *15/1850
console.log(mm, canv.height/mm)
ctx.fillStyle = 'white'
ctx.fillRect(0, 0, canv.width, canv.height)
ctx.beginPath();
ctx.fillStyle = 'black'
ctx.moveTo(530*mm + 20*mm, 100*mm);
ctx.lineTo(530*mm  + 20*mm + 750*mm, 100*mm)
ctx.lineTo(2*530*mm  + 20*mm + 750*mm, 100*mm + 530*mm)
ctx.lineTo(2*530*mm  + 20*mm + 750*mm, 100*mm + 530*mm + 1500*mm)
ctx.lineTo(20*mm, 100*mm + 530*mm + 1500*mm)
ctx.lineTo(20*mm, 100*mm + 530*mm)
ctx.closePath()
ctx.stroke()
ctx.moveTo(530*mm + 20*mm, 100*mm);
ctx.lineTo(530*mm  + 20*mm, 100*mm + 530*mm + 1500*mm)
ctx.stroke();
ctx.moveTo(530*mm + 20*mm + 750*mm, 100*mm);
ctx.lineTo(530*mm  + 20*mm + 750*mm, 100*mm + 530*mm + 1500*mm)
ctx.stroke()
ctx.moveTo(20*mm, 100*mm + 530 *mm)
ctx.lineTo(2*530*mm  + 20*mm + 750*mm, 100*mm + 530 *mm)
ctx.stroke()
