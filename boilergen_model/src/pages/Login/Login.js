import React, { Component } from 'react';
import { render } from 'react-dom';

import Button from 'material-ui/Button';

import LoginApi from 'api/login.api';
import Message from 'commom/Dialog/Message/Message';
import './Login.scss';

class Login extends Component {

    constructor(props){
        super()
    }

    testClick = (event) => {
        let loginApi = new LoginApi();
        loginApi.login();

        this.refs.dialog.open("Testing 123", "Hello world!");
    }

    render(){
        return (
            <div>
                <div>
                    Login page
                    <br/><br/>
                    <Button variant="raised" color="primary">
                        Normal
                    </Button>
                    <br/><br/>
                    <Button variant="raised" color="secondary" onClick={this.testClick}>
                        Dialog
                    </Button>
                </div>
                <Message ref="dialog"/>
            </div>
        )
    }
}

export default Login;