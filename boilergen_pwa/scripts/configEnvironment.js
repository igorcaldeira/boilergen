const fs = require('fs');
const path = require("path");
let pathFile = path.resolve(__dirname, '../src/config/app.json');
const chalk = require('chalk');
const _ = require('lodash');
let env = process.env;
let data = {};

_.map(env, (value, key) => {
    let PRD = key.replace(/PRD_/g, '');
    if (key.indexOf('PRD') > -1 && key.indexOf('BASE64') === -1) {
        data[PRD] = value;
    } else if (key.indexOf('BASE64') > -1 && key.indexOf('PRD') > -1) {
        data[PRD.replace(/BASE64_/g, '').replace(/_BASE64/g, '')] =  Buffer.from(value).toString('base64');
    } 
});

data = JSON.stringify(data);

fs.writeFile(pathFile, data, (err) => {
    if (err) throw err;
    console.log(chalk.yellow(`Build of the PRDuction`));
});