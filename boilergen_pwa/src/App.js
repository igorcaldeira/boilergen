import React from 'react';
import {connect} from 'react-redux';
import * as uiSelectors from "./store/ui/navigation/reducer";
import {withRouter} from "react-router-dom";

class App extends React.Component {

  componentDidMount() {
    console.log(this.props.ui);
    this.props.history.push(this.props.ui.url);
  }

  render() {
    return this.props.children;
  }
}

const mapStateToProps = state => ({
  ui: uiSelectors.getUi(state)
})

export default withRouter(connect(mapStateToProps, null)(App));
