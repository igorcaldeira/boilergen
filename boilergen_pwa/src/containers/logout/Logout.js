import React from 'react'
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import ContentUnlogged from "../../common/contentUnlogged/ContentUnlogged";
import HeaderUnlogged from "../../common/header/headerUnlogged/HeaderUnlogged";
import * as uiActions from "../../store/ui/navigation/actions";
import * as uiSelectors from "../../store/ui/navigation/reducer";
import {withRouter} from "react-router-dom";

class Logout extends React.Component {

    render() {
        return (<ContentUnlogged>
            <HeaderUnlogged/>
            <div>
                <h1>Logout</h1>
                <p>Logout component: <small style={{color: 'blue'}}>src/containers/logout/Logout.js</small></p>
            </div>
        </ContentUnlogged>)
    }
}

const mapStateToProps = state => ({
    ui: uiSelectors.getUi(state)
})

const mapDispatchToProps = dispatch => bindActionCreators({
    ...uiActions,
}, dispatch)

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Logout));
