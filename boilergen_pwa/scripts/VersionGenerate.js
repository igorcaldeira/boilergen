const exec = require('child_process').exec
const readLineAux = require('readline-sync');
const fs = require('fs');
const path = require("path");
const chalk = require('chalk');
//let pathFile = path.resolve(__dirname, '../src/constants/version.json');
//var version = require('../src/constants/version.json');
const months = {
    0: "JAN",
    1: "FEV",
    2: "MAR",
    3: "ABR",
    4: "MAI",
    5: "JUN",
    6: "JUL",
    7: "AGO",
    8: "SET",
    9: "OUT",
    10: "NOV",
    11: "DEZ"
}

class VersionGenerate {
    constructor(FilePathInitial = '../src/constants/version.json', ENV = "HML") {
        this._version = require(FilePathInitial);
        this._pathFile = path.resolve(__dirname, FilePathInitial);
        this._hasFix = false;
        this._fix = '';
        this._rc = '';
        this._isRc = false;
        this._hasNewFeature = false;
        this._newFeatureValue = 0;
        this._isProduction = ENV !== "HML" ? true : false;
        this._versionNumber = this._version.NUMBER.split(".");
        this._dataFile = fs.readFileSync(this._pathFile, 'utf-8');
        console.log(chalk.yellow("\nBUILD APPCI INTER"));
        console.log(chalk.yellow("================= \n"));
    }

    // questionProduction() {
    //     process.stdin.isTTY = process.stdout.isTTY = true;
	// 	this._isProduction = readLineAux.question(chalk.red('\nBuild is for PRODUCTION? (y/n) '));
    //     this._isProduction = this._isProduction.toLocaleLowerCase() === 'y';
    //     if (this._isProduction) {
    //         console.log(chalk.red("\nDon't forget to test HML first because It will take HML version... :) \nThank you."));
    //     }
    // }

    questionFix() {
        process.stdin.isTTY = process.stdout.isTTY = true;
		this._hasFix = readLineAux.question(chalk.yellow('\nBuild is a FIX? (y/n) '));
		this._hasFix = this._hasFix.toLocaleLowerCase() === 'y';
    }

    setFix() {
        if (this._hasFix) {
            this._versionNumber[2] = this._versionNumber[2].replace("-rc", "");
            this._fix = parseInt(this._versionNumber[2], 10) + 1;
        } else {
            this._fix = parseInt(this._versionNumber[2], 10);
        }
    }

    questionNewFeature() {
        process.stdin.isTTY = process.stdout.isTTY = true;
		this._hasNewFeature = readLineAux.question(chalk.yellow('\nBuild has NEW FEATURE? (y/n) '));
        this._hasNewFeature = this._hasNewFeature.toLocaleLowerCase() === 'y';
    }

    setNewFeatures() {
        if (this._hasNewFeature) {
			this._newFeatureValue = parseInt(this._versionNumber[1], 10) + 1;
			//this._fix = 0;
		} else {
			this._newFeatureValue = parseInt(this._versionNumber[1], 10);
		}
    }

    questionRc() {
        process.stdin.isTTY = process.stdout.isTTY = true;
		this._isRc = readLineAux.question(chalk.yellow('Is it a RELEASE CANDIDATE? (y/n) '));
		this._isRc = this._isRc.toLocaleLowerCase() === 'y';
		if (this._isRc) {
			this._rc = '-rc';
		} 
    }

    setVersion() {
        let date = new Date();
		const finalVersion = `${this._versionNumber[0]}.${this._newFeatureValue}.${this._fix}${this._rc}`;
		let newValue = this._dataFile.replace(`${this._version.NUMBER.toString()}`, `${finalVersion}`);
		newValue = newValue.replace(`${this._version.MONTH.toString()}`, `${months[date.getMonth()]}/${date.getFullYear()}`);
		fs.writeFileSync(this._pathFile, newValue, 'utf-8');
		console.log(chalk.green(`Generating version ${finalVersion}`));
    }

    execbash(command) {
        return new Promise(resolve => {
            exec(command, (error, stdout, stderr) => {
                resolve(stdout)
            })
        })
    }

    async sendToGit() {
        await this.execbash(`git commit -am "Generate version ${this._newFeatureValue}.${this._fix}${this._rc} in build"`);
		await this.execbash(`git push`)
    }

    async generate() {
        if(!this._isProduction) { 
            this.questionFix();
            this.questionNewFeature();
            this.questionRc();
        }
        this.setFix();
        this.setNewFeatures();
        this.setVersion();
        await this.sendToGit();
        process.exit();
    }
}

module.exports = VersionGenerate;