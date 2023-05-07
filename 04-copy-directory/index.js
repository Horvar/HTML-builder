const fs = require('fs');
const path = require('path');

const sourceFolderName = 'files'
const targetFolderName = 'files-copy'
const folderPath = path.join(__dirname, sourceFolderName);
const folderCopyPath = path.join(__dirname, targetFolderName);

const copyFiles = () => {
  // Создание папки
  fs.mkdir(folderCopyPath, {recursive: true}, (err) => {

    // Перебор и копирование файлов
    fs.readdir(folderPath, (err, files) => {
      files.forEach(file => {
        const sourceFile = path.join(__dirname, sourceFolderName, file);
        const targetFile = path.join(__dirname, targetFolderName, file);

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
    fs.rmdir(folderCopyPath, {recursive: true}, (err) => {
      console.log('\033[32m' + `Папка ${targetFolderName} успешно обновлена.` + '\033[0m');
      copyFiles();
    });

  } else {
    // Копировать без удаления
    console.log('\033[34m' + `Папка ${targetFolderName} создана.` + '\033[0m');
    copyFiles();
  }
});