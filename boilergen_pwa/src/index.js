import React from 'react';
import ReactDOM from 'react-dom';
import './assets/scss/normalize.scss';
import './assets/scss/materialize-icon.scss';
import './assets/scss/App.scss';
import registerServiceWorker from './registerServiceWorker';
import {Provider} from 'react-redux';
import {persistor, state} from './store/store';
import App from "./App";
import { PersistGate } from 'redux-persist/integration/react';
import * as routers from "./constants/routers";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Login from "./containers/login/Login";
import Logout from "./containers/logout/Logout";
import PrivateRoute from "./PrivateRoute";

ReactDOM.render(
        <Provider store={state}>
			<PersistGate loading={null} persistor={persistor}>
                    <Router key={Math.random()}>
                        <App>
                            <Route exact path={routers.ROOT} component={Login}/>
                            <PrivateRoute path={routers.LOGOUT} component={Logout} />
                        </App>
                    </Router>
            </PersistGate>
        </Provider>,
    document.getElementById('root'));
registerServiceWorker();
