# boilergen :fire:

### Generator based on create-react-app for some small apps

Includes SASS, material ui, react-animated-css and a base folder so you can match your project structure.

You can run this script at your projects folder with 

`npm run boilergen` and choose option 1

# Pwa React Generate

You can run `npm run boilergen` and choose option 2. It will start project with [Create React App](https://github.com/facebookincubator/create-react-app). 

## It's includes the packages

 - [Sass](https://sass-lang.com/)
 - [material ui](https://v1-3-0.material-ui.com/) 
 - [redux](https://redux.js.org/)
 - [redux-saga](https://redux-saga.js.org/)
 - [redux-persist](https://github.com/rt2zz/redux-persist)
 - [reselect](https://github.com/reduxjs/reselect)

## App config

Your configuration can be write on `your-app-name/.env` for example:

```sh
    DEV_NODE_ENV=development
    DEV_APP_NAME=
    DEV_API_HOST=
    DEV_VERSION=v1
    DEV_REFRESH_TOKEN=300000
    DEV_ACCESS_KEY_NAME=Access-Key
    DEV_PARAM_TOKEN_NAME=Authorization
    DEV_BEARER=Bearer
    BASE64_HML_BASIC=teste:teste

    HML_NODE_ENV=development
    HML_APP_NAME=boilergen
    HML_API_HOST=http://app-url
    HML_VERSION=v1
    HML_REFRESH_TOKEN=300000
    HML_ACCESS_KEY_NAME=Access-Key
    HML_PARAM_TOKEN_NAME=c
    HML_BEARER=Bearer
    BASE64_HML_BASIC=teste:teste

    PRD_NODE_ENV=production
    PRD_APP_NAME=
    PRD_HOST_TOKEN=
    PRD_API_HOST=
    PRD_VERSION=v1
    PRD_REFRESH_TOKEN=300000
    PRD_ACCESS_KEY_NAME=Access-Key
    PRD_PARAM_TOKEN_NAME=Authorization
    PRD_BEARER=Bearer
    BASE64_PRD_BASIC=teste:teste
```
When you to start the app It will be genereted an app.json file in `your-app-name/src/config/app.json` as that variable. 
Final file of HML example:

```json
 {
     "NODE_ENV": "development",
     "APP_NAME": "boilergen",
     "API_HOST": "http://app-url",
     "VERSION": "v1",
     "REFRESH_TOKEN": "300000",
     "ACCESS_KEY_NAME": "Access-Key",
     "PARAM_TOKEN_NAME": "Authorization",
     "BEARER": "Bearer",
     "BASIC": "dGVzdGU6dGVzdGU="
 }
```


## Version control

After creation, your project should look like this:
In path `your-app-name/src/constatns/version.json` has a file for version control. That file is updated when you run the build.

## Build

- DEV `npm run build-dev`
- HML `npm run build-hml`
- PRD `npm run build-prd`

## Folder structure

```
your-app-name/
    README.md
    config
        jest/
            cssTransform.js
            fileTransform.js
        env.js
        paths.js
        poths.js
        polyfills.js
        webpack.config.dev.js
        webpack.config.prod.js
        webpackDevServer.config.js
    public/
        assets/
        index.html
        manifest.json
        service-worker.js
    src/
        assets/
        common/
        config/
        constants/
        containers/
        models/
        sagas/
        services/
        store/
        test/
        utilites/
        App.js
        index.js
        registerServiceWorker.js
        .env
        .gitignore
        server.js
```
Thanks @miguenetoarte for the versioning scripts and pwa model
