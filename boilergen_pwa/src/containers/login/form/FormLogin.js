import React from 'react';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actionAuth from '../../../store/auth/actions';

class FormLogin extends React.Component {

    render() {
        console.log(this.props);
        return (
            <div>
                <h1>Hello, are you app maker?</h1>
                <p>So insert your form here <small style={{color: 'blue'}}>src/containers/login/form/FormLogin.js</small></p>
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => bindActionCreators({
    ...actionAuth
}, dispatch)

export default connect(null, mapDispatchToProps)(FormLogin);