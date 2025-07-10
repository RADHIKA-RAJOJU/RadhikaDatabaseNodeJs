const fs= require('fs')
fs.writeFile('example.txt', 'Hello, this is my first file in Node.js!', (err) => {
  if (err) throw err;
  console.log('File created and content written successfully!');
});
fs.appendFile('example2.txt', 'Appending this text.\n', (err) => {
  if (err) throw err;
  console.log('File created/appended successfully!');
});
fs.open('example3.txt', 'w', (err, file) => {
  if (err) throw err;
  console.log('Empty file created successfully!');
  fs.close(file, (err) => {
    if (err) throw err;
  });
});
