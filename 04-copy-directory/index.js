const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, 'files');
const destDir = path.join(__dirname, 'files-copy');
// создать папку если ее нет или очистить папку если она уже есть
fs.access(destDir, (err) => {
  if (!err) {
    fs.rm(destDir, { recursive: true }, (err) => {
      if (err) throw err;
      copyDirectory(srcDir, destDir);
    });
  } else {
    copyDirectory(srcDir, destDir);
  }
});

function copyDirectory(src, dest) {
  fs.mkdir(dest, { recursive: true }, (err) => {
    if (err) throw err;
    fs.readdir(src, { withFileTypes: true }, (err, files) => {
      if (err) throw err;
      files.forEach((file) => {
        const srcPath = path.join(src, file.name);
        const destPath = path.join(dest, file.name);
        // проверка есть ли папки внутри и копировать их с файлами
        if (file.isDirectory()) {
          copyDirectory(srcPath, destPath);
        } else {
          // копирую файлы
          fs.copyFile(srcPath, destPath, (err) => {
            if (err) throw err;
          });
        }
      });
    });
  });
}