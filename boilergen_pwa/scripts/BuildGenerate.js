const fs = require('fs');
const path = require("path");
const chalk = require('chalk');
const _ = require('lodash');
const HML = "HML";
const PRD = "PRD";
const DEV = "DEV";


class BuildGenerate {
    constructor(appConfig, env) {
        this._pathFile = path.resolve(__dirname, appConfig);
        this._data = {};
        this._env = process.env;
        this._localVariable = env;
        this._flag = this._hasLoacalVariable(env)
        this._generate();
        this._writeFile();
    }

    _hasLoacalVariable(env) {
        return env === HML ? HML : env === DEV ? DEV : PRD;
    }

    _generate() {
        _.map(this._env, (value, key) => {
            this._prefix = this._flag === HML ? key.replace(/HML_/g, '') : this._flag === DEV ? key.replace(/DEV_/g, '') : key.replace(/PRD_/g, '');
            if (key.indexOf(this._flag) > -1 && key.indexOf('BASE64') === -1) {
                this._data[this._prefix] = value;
            } else if (key.indexOf('BASE64') > -1 && key.indexOf(this._flag) > -1) {
                this._data[this._prefix.replace(/BASE64_/g, '').replace(/_BASE64/g, '')] =  Buffer.from(value).toString('base64');
            } 
        });
    }

    _writeFile() {
        this._data = this._flag != PRD ? JSON.stringify(this._data, null, 4) : JSON.stringify(this._data);
        fs.writeFile(this._pathFile, this._data, (err) => {
            if (err) throw err;
            console.log(chalk.yellow(`\nSee your local variables bellow:`));
            console.log(chalk.yellow(this._data));
        });
    }
}

module.exports = BuildGenerate;