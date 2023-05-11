const fs = require('fs');
const path = require('path');

// Общие переменные
const srcStylesFolder = 'styles'
const srcAssetsFolder = 'assets'
const srcComponentsFolder = 'components'
const bundleFolder = 'project-dist';

const bundleNameCss = 'style.css';
const bundleNameHtml = 'index.html';

const srcStylesPath = path.join(__dirname, srcStylesFolder);
const srcAssetsPath = path.join(__dirname, srcAssetsFolder);
const distFolderPath = path.join(__dirname, bundleFolder);

const compileProject = () => {
  // Создание папки
  fs.mkdir(distFolderPath, {recursive: true}, (err) => {

    // Перебор и копирование файлов
    const copyFile = (source, target) => {
      fs.mkdir(path.dirname(target), { recursive: true }, (err) => {
        fs.readFile(source, (err, data) => {
          fs.writeFile(target, data, (err) => {});
        });
      });
    };

    // Рекурсивное чтение папки
    const readFolder = (folder) => {
      fs.readdir(folder, { withFileTypes: true }, (err, items) => {
        items.forEach(item => {
          const itemPath = path.join(folder, item.name);
          const relativePath = path.relative(srcAssetsPath, itemPath);
          const itemPathBundle = path.join(distFolderPath, srcAssetsFolder, relativePath);
          if (item.isDirectory()) {
            fs.mkdir(itemPathBundle, { recursive: true }, (err) => {});
            readFolder(itemPath);
          } else {
            copyFile(itemPath, itemPathBundle);
          }
        });
      });
    };

    // Объединение css
    const compileStyles = () => {
      let arrBundle = [];
      fs.readdir(srcStylesPath, (err, files) => {
        files.forEach(file => {
          const fileExt = path.extname(file);
          if (fileExt === '.css') {
            const filePath = path.join(__dirname, srcStylesFolder, file);
            fs.readFile(filePath, (err, data) => {
              arrBundle.push(data.toString());
              if (arrBundle.length === files.filter(f => path.extname(f) === '.css').length) {
                const bundleContent = arrBundle.join('\n');
                fs.writeFile(path.join(__dirname, bundleFolder, bundleNameCss), bundleContent, (err) => {});
              }
            });
          }
        });
      });
    };

    // Объединение html
    const compileHtml = () => {
      const templatePath = path.join(__dirname, 'template.html');
      const headerPath = path.join(__dirname, srcComponentsFolder, 'header.html');
      const articlesPath = path.join(__dirname, srcComponentsFolder, 'articles.html');
      const footerPath = path.join(__dirname, srcComponentsFolder, 'footer.html');

    // Чтение файлов
      fs.readFile(templatePath, 'utf-8', (err, templateData) => {
        if (err) throw err;
        fs.readFile(headerPath, 'utf-8', (err, headerData) => {
          if (err) throw err;
          fs.readFile(articlesPath, 'utf-8', (err, articlesData) => {
            if (err) throw err;
            fs.readFile(footerPath, 'utf-8', (err, footerData) => {
              if (err) throw err;

              // Вставка компонентов
              const html = templateData
                  .replace('{{header}}', headerData)
                  .replace('{{articles}}', articlesData)
                  .replace('{{footer}}', footerData);

              // Финальная запись
              fs.writeFile(path.join(distFolderPath, bundleNameHtml), html, err => {});
            });
          });
        });
      });
    };

    readFolder(srcAssetsPath)
    compileHtml()
    compileStyles()
  });
}

// Полное копирование папки
fs.access(distFolderPath, (err) => {
  if (!err) {
    fs.rm(distFolderPath, {recursive: true}, (err) => {
      console.log('\033[32m' + `Папка ${bundleFolder} успешно обновлена.` + '\033[0m');
      compileProject();
    });
  } else {
    console.log('\033[34m' + `Папка ${bundleFolder} создана.` + '\033[0m');
    compileProject();
  }
});