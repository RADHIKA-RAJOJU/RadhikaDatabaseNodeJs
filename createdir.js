const fs = require('fs');

fs.mkdir('Filefolder', (err) => {
  if (err) throw err;
  console.log('Directory created successfully!');
});