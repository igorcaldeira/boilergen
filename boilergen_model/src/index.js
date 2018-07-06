import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Switch } from 'react-router';
import createHistory from 'history/createBrowserHistory'
import registerServiceWorker from './registerServiceWorker';

import API from 'guidelines/api';
import 'guidelines/style/style.scss';

import Login from 'pages/Login/Login';

const routeHistory = createHistory()

API.defineRequestInterceptor(localStorage);
API.defineResponseInterceptor(routeHistory);

ReactDOM.render((
    <Router history={routeHistory}>
        <Switch>
            <Route path="/login" component={Login}/>
            <Route path="/" component={Login}/>
        </Switch>
    </Router>
),document.getElementById('root'));

registerServiceWorker();