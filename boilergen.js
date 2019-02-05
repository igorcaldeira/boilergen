const exec = require('child_process').exec;
const models = require('./models');
class Boilergen {
    constructor() {
        this._model = models.react_base.path;
        this._modelOption = 1;
        this._name = 'project';
        this._chalk = '';
        this._readLineAux = '';
    }

    questionProjectModel() {
        process.stdin.isTTY = process.stdout.isTTY = true;
        console.log(this._chalk.yellow(`What model app do you want to create?\n`));
        this._modelOption = this._readLineAux.question(this._chalk.green('1 Basic React model\n2 PWA (progressive web app)\n'));
        switch(this._modelOption) {
            case "2":
                this._model = models.react_pwa.path;
                console.log(this._chalk.blue(`\nCreating app ${this._name} -> ${models.react_pwa.name}... from ${this._model}`));
            break;
            default:
                this._model = this._model;
                console.log(this._chalk.blue(`\nCreating app ${this._name} -> ${models.react_base.name}... from ${this._model}`));
        }
        
    }

    questionProjectName() {
        process.stdin.isTTY = process.stdout.isTTY = true;
        this._name = this._readLineAux.question(this._chalk.green('\nWhat is your app name? '));
    }

    printDescription() {
        console.log(this._chalk.yellow("\nCLI v0.0.2"));
        console.log(this._chalk.yellow("=========="));
    }

    execbash(command){
            return new Promise(resolve => {
            exec(command, (error, stdout, stderr) => {
                console.log(stderr);
                console.log(stdout);
                resolve(stdout)
            })
        })
    }

    async installRedlineSync() {
        await this.execbash('npm i readline-sync chalk');
    }

    async installReactScript() {
        await this.execbash('npm i --global react-scripts');
    }

    importLibs() {
        this._chalk = require('chalk');
        this._readLineAux = require('readline-sync');
    }

    async createApp() {
        await this.execbash(`npx create-react-app ${this._name}`);
        await this.execbash(`cd ${this._name} && echo "y" | react-scripts eject `);
        console.log(this._chalk.green(`Copying ${this._model}...  (this one is blazing fast, i swear) `));
        await this.execbash(`cd ${this._name} && rm -rf ./src`)
        await this.execbash(`cp -r ./${this._model}/* ./${this._name}/`);
        await this.execbash(`cd ${this._name} && touch .env && npm install`);
        console.log(this._chalk.green(`\nGenerated successfully!\nYour app is available in ${this._name} folder\n`));
    }

    async finalInformative() {
        console.log(this._chalk.blue('\nAwesome, project ready!\n'))
        console.info(this._chalk.blue('To start use -> npm start or yarn start\n'))
        console.info(this._chalk.blue('To test use -> npm test or yarn test\n'))
        console.info(this._chalk.blue('To build use -> npm run build or yarn build\n'))
        console.log(this._chalk.blue("(tip: sometimes it's to run with sudo prefix)\n"))
    }

    async genereate() {
        try {
            this.importLibs();
            this.printDescription();
        } catch (error) {
            await this.installRedlineSync();
            await this.installReactScript();
            this.importLibs();
            this.printDescription();
        }
        await this.questionProjectName();
        await this.questionProjectModel();
        await this.createApp();
        this.finalInformative();
    }
}

new Boilergen().genereate();