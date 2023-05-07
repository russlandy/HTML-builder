const fs = require('fs');
const path = require('path');
const {stdin, stdout} = process;

fs.writeFile(
  path.join(__dirname, 'sometext.txt'),
  '',
  (err) => {
    if (err) throw err;
    stdout.write('Input some text: \n');
    stdin.on('data', data => {
      const dataString = data.toString().trim();
      if (dataString === 'exit') {
        stdout.write('Bye-bye!');
        process.exit();
      } else fs.appendFile(
        path.join(__dirname, 'sometext.txt'),
        data,
        err => {
          if (err) throw err;
        }
      );
    });
    process.on('SIGINT', () => {
      stdout.write('Bye-bye!');
      process.exit();
    });
  }
);
