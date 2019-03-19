import React from 'react';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';

  const fakeAuth = {
    isAuthenticated: true, //set false when user doesn't logged
    authenticate(cb) {
      this.isAuthenticated = true;
      setTimeout(cb, 100);
    },
    signout(cb) {
      this.isAuthenticated = false;
      setTimeout(cb, 100);
    }
  };

const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={(props) => (
      fakeAuth.isAuthenticated === true
        ? <Component {...props} />
        : <Redirect to={{
          pathname: "/",
          state: { from: props.location }
        }} />
    )} />
  );

const mapStateToProps = state => ({
})

const mapDispatchToProps = dispatch => bindActionCreators({


}, dispatch)

  export default connect(mapStateToProps, mapDispatchToProps)(PrivateRoute);