const exec = require('child_process').exec
const readLineAux = require('readline-sync');
const fs = require('fs');
const path = require("path");
let pathFile = path.resolve(__dirname, '../src/constants/version.json');
let version = require('../src/constants/version.json');
let dataFile = fs.readFileSync(pathFile, 'utf-8');

let versionNumber = version.NUMBER.split(".");

let fix = '';
let newFunctions = ''

const execbash = function(command){
	return new Promise(resolve => {
		exec(command, (error, stdout, stderr) => {
			resolve(stdout)
		})
	})
};

console.log('')
console.log('Build CI Inter');

let months = {
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

const phases = {
	'questionFix': async function(){
		process.stdin.isTTY = process.stdout.isTTY = true;
		fix = readLineAux.question('Build is a FIX? (y/n)');
		fix = fix.toLocaleLowerCase() === 'y' ? true : false;
		return new Promise(resolve => {
			resolve()
		})
	},
	'setFix': async function() {
		if (fix) {
			fix = parseInt(versionNumber[2]) + 1;
		} else {
			fix =  parseInt(versionNumber[2]);
		}
	},
	'questionNewFunctions': async function() {
		process.stdin.isTTY = process.stdout.isTTY = true;
		newFunctions = readLineAux.question('Build has NEW FUNCTIONS? (y/n)');
		newFunctions = newFunctions.toLocaleLowerCase() === 'y' ? true : false;
		return new Promise(resolve => {
			resolve()
		})
	},
	'setNewFunctions': async function() {
		if (newFunctions) {
			newFunctions = parseInt(versionNumber[1]) + 1;
		} else {
			newFunctions = parseInt(versionNumber[1]);
		}
	},
	'setVersion':  async function() {
		let date = new Date();
		let finalVersion = `${versionNumber[0]}.${newFunctions}.${fix}`;
		let newValue = dataFile.replace(`${version.NUMBER.toString()}`, `${finalVersion}`);
		newValue = newValue.replace(`${version.MOUNTH.toString()}`, `${months[date.getMonth()]}/${date.getFullYear()}`);
		fs.writeFileSync(pathFile, newValue, 'utf-8');
		console.log(`Generating version ${finalVersion}`);

	},
	'build': async function() {
		const resp1 = await execbash('git commit -am "Update version in build"');
		return new Promise(resolve => {
			resolve()
		})
	}

};

const generateBuild = async function () {
	await phases.questionFix();
	await phases.setFix();
	await phases.questionNewFunctions();
	await phases.setNewFunctions();
	await phases.setVersion();
	await phases.build();
	process.exit();
};

generateBuild();
