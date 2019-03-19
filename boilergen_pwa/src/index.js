import React from 'react';
import ReactDOM from 'react-dom';
import './assets/scss/normalize.scss';
import './assets/scss/materialize-icon.scss';
import './assets/scss/App.scss';
import registerServiceWorker from './registerServiceWorker';
import {Provider} from 'react-redux';
import {persistor, state} from './store/store';
import App from "./App";
import {createMuiTheme, MuiThemeProvider} from '@material-ui/core/styles';
import {browserHistory, Route, Router} from 'react-router';
import { PersistGate } from 'redux-persist/integration/react';
import * as routers from "./constants/routers";
import Login from "./containers/login/Login";

const theme = createMuiTheme({
    palette: {
        primary: {
            light: '#ff7961',
            main: '#ba000d',
            dark: '#ba000d',
            contrastText: '#fff',
        },
        secondary: {
            light: '#ff7961',
            main: '#f44336',
            dark: '#ba000d',
            contrastText: '#000',
        },
    },
});

ReactDOM.render(
    <MuiThemeProvider theme={theme}>
        <Provider store={state}>
			<PersistGate loading={null} persistor={persistor}>
				<App>
					<Router key={Math.random()} history={browserHistory}>
						<Route exact path={routers.ROOT} component={Login}/>
					</Router>
				</App>
            </PersistGate>
        </Provider>
    </MuiThemeProvider>,
    document.getElementById('root'));
registerServiceWorker();
