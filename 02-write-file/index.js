const fs = require('fs');
const path = require('path');

// text variables
const filename = 'text.txt'
const textCreate = `\u2192 Файл ${filename} создан.`
const textInput = '\u2192 Введите текст для записи или используйте \x1b[31mexit\x1b[0m для выхода:'
const textExit = '\u2192 Процесс завершен.'

const file = fs.createWriteStream(path.join(__dirname, filename));

const exit = () => {
  console.log(textExit);
  process.exit();
}

console.log(textCreate);
console.log(textInput);

// input handler
const handleInput = (data) => {
  const input = data.toString().trim();

  if (input === 'exit') {
    exit()
  }

  file.write(`${input}\n`);
  console.log(textInput);
};

process.stdin.on('data', handleInput);
process.on('SIGINT', exit)