var exec = require('child_process').exec
var stdin = process.openStdin()
var model = process.env.NODE_ENV ? process.env.NODE_ENV : 'boilergen_model';

let readLineAux = false;
let chalk = false;
let name ='my-app';
let seelogs = true;

const execbash = function(command){
    return new Promise(resolve => {
      exec(command, (error, stdout, stderr) => {
        /* console.log(stdout) */
        resolve(stdout)
      })
    })
}

console.log(model.toUpperCase()+' CLI v1')
console.log('')

const phases = {
'PrepareWorkspace': async function(){
    console.log('Preparing workspace...')
    const resp = await execbash('npm install readline-sync chalk')
    readLineAux = require('readline-sync')
	chalk = require('chalk');
    const global = await execbash('sudo npm i --global react-scripts')
    return new Promise(resolve => {
        resolve()
    })
},
'GetProjectData': async function(){
	process.stdin.isTTY = process.stdout.isTTY = true;
    name = readLineAux.question(chalk.green('What is your app name? '));
    return new Promise(resolve => {
        resolve()
    })
},
'CreateProject': async function(){
    console.log(model);
    console.log("Creating app... \033[0;32m (it can take a while, time to grab a coffee) \033[0m ")
    await execbash('npx create-react-app '+name)
    console.log('Ejecting app... \033[0;32m (it can take a while too, time to grab some tea) \033[0m ')
    await execbash('cd '+name+' && echo "y" | sudo react-scripts eject ')
    console.log(`Copying ${model}...  (this one is blazing fast, i swear) `)
    await execbash('cd '+name+' && rm -rf ./src')
    console.log(model);
    await execbash('cp -r ./'+model+'/* ./'+name+'/')
    await execbash('cd '+name+' && touch .env && npm install')
    console.log('Getting some libs with yarn... \033[0;32m (Almost there, trust me) \033[0m ')
    await execbash('yarn')
    await execbash('npm start')
    
    return new Promise(resolve => {
        resolve()
    })
},
'FinalInformative': async function(){
    
    console.log('')
    console.log('Awesome, project ready!')
    console.log('')
    console.info('To start use -> npm start or yarn start')
    console.info('To test use -> npm test or yarn test')
    console.info('To build use -> npm run build or yarn build')
    console.log('')
    console.log("(tip: sometimes it's to run with sudo prefix)")
    console.log('')

    return new Promise(resolve => {
        resolve()
    })
},
'CleanWorkspace': async function(){
    const resp3 = await execbash('rm -rf node_modules')
    return new Promise(resolve => {
        resolve()
    })
}

}

const createNewApp = async function(){
    await phases.PrepareWorkspace()
    await phases.GetProjectData()
    await phases.CreateProject()
    await phases.FinalInformative()
    await phases.CleanWorkspace()
    process.exit()
}

createNewApp()