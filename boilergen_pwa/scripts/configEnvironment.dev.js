const fs = require('fs');
const path = require("path");
let pathFile = path.resolve(__dirname, '../src/config/app.json');
const chalk = require('chalk');
const _ = require('lodash');
let env = process.env;

let data = {};

_.map(env, (value, key) => {
    let hml = key.replace(/HML_/g, '');
    if (key.indexOf('HML') > -1 && key.indexOf('BASE64') === -1) {
        data[hml] = value;
    } else if (key.indexOf('BASE64') > -1 && key.indexOf('HML') > -1) {
        data[hml.replace(/BASE64_/g, '').replace(/_BASE64/g, '')] =  Buffer.from(value).toString('base64');
    }
});

data = JSON.stringify(data, null, 4);

fs.writeFile(pathFile, data, (err) => {
    if (err) throw err;
    console.log(chalk.yellow(`Build of the ${process.env.NODE_ENV}`));
});