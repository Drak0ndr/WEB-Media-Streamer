const sharp = require('sharp');
console.time('webp')
sharp('cosmo.jpg')
.toFile('output.webp', (err, info) => {});
console.timeEnd('webp')