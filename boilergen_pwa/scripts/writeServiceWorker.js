const fs = require('fs');
const path = require("path");
const file = path.resolve(__dirname, '../public/service-worker.js');
let data = fs.readFileSync(file, 'utf-8');
let newValue = data.replace(/io_/g, `io_${Math.random().toString(36).substr(2, 1)}`);
newValue = newValue.replace(/ioPWA_/g, `ioPWA_${Math.random().toString(36).substr(2, 1)}`);
fs.writeFileSync(file, newValue, 'utf-8');
