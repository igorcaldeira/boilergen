import React from 'react';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actionAuth from '../../../store/auth/actions';
import * as selectorsAuth from "../../../store/auth/reducer";
import * as uiActions from "../../../store/ui/navigation/actions";
import * as uiSelectors from "../../../store/ui/navigation/reducer";
import * as routers from "../../../constants/routers";
import {withRouter} from "react-router-dom";

class FormLogin extends React.Component {

    constructor(props) {
        super(props);
        this.state = props.auth;
    }

    componentDidMount() {
        console.log(this.props.auth);
        this.props.setNavigation(routers.ROOT, this.props.auth);
    }

    render() {
        return (
            <div>
                <h1>Login</h1>
                <p>Login component: <small style={{color: 'blue'}}>src/containers/login/form/FormLogin.js</small></p>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    auth: selectorsAuth.getAuth(state),
    ui: uiSelectors.getUi(state)
})

const mapDispatchToProps = dispatch => bindActionCreators({
    ...actionAuth,
    ...uiActions,
}, dispatch)

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(FormLogin));