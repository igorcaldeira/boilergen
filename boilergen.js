var exec = require('child_process').exec
var stdin = process.openStdin()

let readLineAux = false;
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

console.log('')
console.log('')
console.log('Boilergen CLI v1')
console.log('')
console.log('')

const phases = {
'PrepareWorkspace': async function(){
    console.log('Preparing workspace...')
    const resp = await execbash('npm install readline-sync')
    readLineAux = require('readline-sync')
    const global = await execbash('sudo npm i --global react-scripts')
    return new Promise(resolve => {
        resolve()
    })
},
'GetProjectData': async function(){
    name = readLineAux.question('What is your app name?')
    /* seelogs = (readLineAux.question('Whanna see some logs? (y/n)') === 'y') ? true : false */
    return new Promise(resolve => {
        resolve()
    })
},
'CreateProject': async function(){
    console.log("Creating app... \033[0;32m (it can take a while, time to grab a coffee) \033[0m ")
    await execbash('npx create-react-app '+name)
    console.log('Ejecting app... \033[0;32m (it can take a while too, time to grab some tea) \033[0m ')
    await execbash('cd '+name+' && echo "y" | sudo react-scripts eject ')
    console.log('Copying model... \033[0;32m (this one is blazing fast, i swear) \033[0m ')
    await execbash('cd '+name+' && rm -rf ./src')
    await execbash('cp -r ./boilergen_model/* ./'+name+'/')
    console.log('Getting some libs with yarn... \033[0;32m (Almost there, trust me) \033[0m ')
    await execbash('cd '+name+' && yarn')
    
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
    const resp1 = await execbash('rm -rf package.json')
    const resp2 = await execbash('rm -rf package-lock.json')
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