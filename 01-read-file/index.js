const path = require('path');
const fs = require('fs');

const readStream = fs.createReadStream(path.join(__dirname, 'text.txt'));

readStream.on('data', (chunk) => {
  console.log('\x1b[33m' + chunk.toString() +'\x1b[0m');
});