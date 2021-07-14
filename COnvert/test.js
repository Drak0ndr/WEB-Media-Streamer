const sharp = require('sharp');
var fs = require('fs')
let img = 0
setInterval(() => {
  console.time('webp')

	sharp('cosmo.jpg')
 .toFile('output.webp', (err, info) => {
    //img = JSON.stringify(fs.readFileSync('output.webp', 'base64')) 
    //console.log(img)
  })

console.timeEnd('webp')
}, 0)


  
  