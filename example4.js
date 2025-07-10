const fs = require('fs').promises;
async function createFile() {
  try {
    await fs.writeFile('example4.txt', 'Created using async/await!');
    console.log('File created successfully using async/await!');
  } catch (err) {
    console.error(err);
  }
}
createFile();
