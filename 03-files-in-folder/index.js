const fs = require('fs');
const path = require('path');

const textError = 'не является файлом';
const folderPath = path.join(__dirname, 'secret-folder');

fs.readdir(folderPath, {withFileTypes: true}, (err, files) => {
  files.forEach(file => {
    const fileName = file.name;
    
    if (file.isFile()) {
      
      const fileExt = path.extname(fileName).substring(1);
      const filePath = path.join(__dirname, 'secret-folder', file.name);
      
      fs.stat(filePath, (err, stats) => {
        const fileSize = stats.size;
        console.log(`\x1b[33m${fileName} - ${fileExt} - ${fileSize / 1024}kb\x1b[0m`);
      });
      
    } else {
      console.log(`\x1b[31m${fileName} - ${textError}\x1b[0m`);
    }
    
  });
});