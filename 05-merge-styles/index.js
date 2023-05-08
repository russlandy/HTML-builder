const fs = require('fs');
const path = require('path');

const stylesPath = path.join(__dirname, 'styles');
const outputPath = path.join(__dirname, 'project-dist', 'bundle.css');
// проверка на формат файла
fs.readdir(stylesPath, (err, files) => {
  if (err) throw err;

  const cssFiles = files.filter(file => path.extname(file) === '.css');

  if (cssFiles.length === 0) {
    return;
  }
  // создание массива для стилей
  const cssData = [];
// перебор файлов и добавление стилей в массив
  cssFiles.forEach(file => {
    const filePath = path.join(stylesPath, file);

    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) throw err;

      cssData.push(data);

      if (cssData.length === cssFiles.length) {
        const outputData = cssData.join('\n');

        fs.writeFile(outputPath, outputData, err => {
          if (err) throw err;
        });
      }
    });
  });
});