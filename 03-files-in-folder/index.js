const fs = require('fs');
const path = require('path');

function readDir(dirPath) {
  fs.readdir(dirPath, { withFileTypes: true }, (err, files) => {
    if (err) throw err;

    files.forEach((file) => {
      const filePath = path.join(dirPath, file.name);
      if (file.isDirectory()) {
        fs.readdir(filePath, (err, subfiles) => {
          if (err) throw err;
          if (subfiles.length > 1 || (subfiles.length === 1 && subfiles[0] !== '.gitkeep')) {
            console.log(`folder - ${file.name}`);
            readDir(filePath);
          }
        });
      } else {
        fs.stat(filePath, (err, stats) => {
          if (err) throw err;
          const fileSize = stats.size;
          const fileName = file.name;
          const fileFormat = path.extname(fileName);
          console.log(`${fileName.split('.')[0]} - ${fileFormat} - ${fileSize / 1024} kb`);
        })
      }
    });
  });
}

readDir(__dirname);