const fs = require('fs');
const path = require('path');

const dist = path.join(__dirname, '../dist');
try {
    fs.mkdirSync(dist, { recursive: true });
} catch (e) {
    if (e.code !== 'EEXIST') throw e;
}

['aspnet-validation.css'].forEach(file => {
    console.log(`Copying src/${file} to ${dist}`);
    fs.copyFileSync(
        path.join(__dirname, `../src/${file}`),
        path.join(dist, file));
})