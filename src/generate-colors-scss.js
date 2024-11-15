const fs = require('fs');
const path = require('path');

const colors = require('./colors.json');

let scssContent = ':root {\n';

for (const [key, value] of Object.entries(colors)) {
  scssContent += `  --${key}: ${value};\n`;
}

scssContent += '}';

fs.writeFileSync(path.resolve(__dirname, 'colors.scss'), scssContent);

console.log('Fichier colors.scss généré avec succès.');
