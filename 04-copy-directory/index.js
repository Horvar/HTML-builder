const fs = require('fs');
const path = require('path');

const folderPath =  path.join(__dirname, 'files')
const folderCopyPath = path.join(__dirname, 'files-copy');

const copyFiles = () => {
  // Создание папки
  fs.mkdir(folderCopyPath, { recursive: true }, (err) => {

    // Перебор и копирование файлов
    fs.readdir(folderPath, (err, files) => {
      files.forEach(file => {
        const sourceFile = path.join(__dirname, 'files', file);
        const targetFile = path.join(__dirname, 'files-copy', file);

        fs.readFile(sourceFile, (err, data) => {
          if (err) throw err;

          // Перенос содержимого файла
          fs.writeFile(targetFile, data, (err) => {
            if (err) throw err;
          });
        });
      });
    });
  });
}

// Полное копирование папки
fs.access(folderCopyPath, (err) => {
  if (!err) {
    
    // Удалить копию папки, если она уже существует
    fs.rmdir(folderCopyPath, { recursive: true }, (err) => {
      copyFiles()
    });
    
  } else {
    // Копировать без удаления
    copyFiles()
  }
});