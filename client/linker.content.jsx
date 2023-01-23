const fs = require('fs');

// read input file:

const args = process.argv.slice(2);

const input      = fs.readFileSync(args[0], 'utf8');
const targetFile = fs.readFileSync(args[1], 'utf8');


const modified = targetFile.replace(/<!-- jsx -->/, input);
    
fs.writeFileSync(args[1], modified);

console.log("updated static HTML file, "+args[1]);



