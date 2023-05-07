const fs = require('fs');
const path = require('path');

const filename = 'text.txt';
const textCreate = ('\033[34m' + `Файл ${filename} создан.` + '\033[0m');
const textInput = ('\x1b[33m' + '\u2192 Введите текст для записи или используйте' + '\x1b[0m' + '\x1b[31m' + ' exit ' + '\x1b[0m' + '\x1b[33m' + 'для выхода:' + '\x1b[0m');
const textExit = ('\x1b[31m' + 'Процесс завершен.' + '\x1b[0m');

const file = fs.createWriteStream(path.join(__dirname, filename));

const exit = () => {
  console.log(textExit);
  process.exit();
}

console.log(textCreate);
console.log(textInput);

// Обработчик ввода
const handleInput = (data) => {
  const input = data.toString().trim();

  if (input === 'exit') {
    exit();
  }

  file.write(`${input}\n`);
  console.log(textInput);
};

process.stdin.on('data', handleInput);
process.on('SIGINT', exit);