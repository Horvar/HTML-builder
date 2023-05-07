const fs = require('fs');
const path = require('path');

const stylesFolderName = 'styles'
const bundleFolderName = 'project-dist'
const bundleName = 'bundle.css'
const folderPath = path.join(__dirname, stylesFolderName)
const bundlePath = path.join(__dirname, bundleFolderName, bundleName)
let arrBundle = []

// Прочитать все содержимое styles
fs.readdir(folderPath, (err, files) => {
  files.forEach(file => {
    const fileName = file
    const fileExt = path.extname(fileName)
    
    // Прочитать файл, если это css
    if (fileExt === '.css') {
      const filePath = path.join(__dirname, stylesFolderName, file);
      
      fs.readFile(filePath, (err, data) => {
        arrBundle.push(data.toString())

        // Если все файлы были прочитаны
        if (arrBundle.length === files.filter(f => path.extname(f) === '.css').length) {
          
          // Объединить стили
          const bundleContent = arrBundle.join('\n');

          // Вставить стили в bundle
          fs.writeFile(bundlePath, bundleContent, (err) => {
            console.log('\033[32m' + `Стили успешно скомпилированы в ${bundleName}!` + '\033[0m')
          });
          
        }
        
      });
      
    };
    
  });
});