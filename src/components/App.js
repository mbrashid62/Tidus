// This component handles the App template used on every page.
import React, {PropTypes} from 'react';
import Header from './common/Header';
import * as authActions from '.././actions/authActions';

import { bindActionCreators } from 'redux';
import {connect} from 'react-redux';

class App extends React.Component {

  render() {
    return (
      <div className="container-fluid">
        <Header
          loading={this.props.loading}
          isSignedIn={this.props.isSignedIn}
          user={this.props.signedInUser}
          signOutFunc={this.props.actions.signOutUser}
        />
        {this.props.children}
      </div>
    );
  }
}

App.defaultPropTypes = {
    actions: {},
    children: {},
    loading: false,
    isSignedIn: false,
    signedInUser: {}
};
App.propTypes = {
    actions: PropTypes.object.isRequired,
    children: PropTypes.object.isRequired,
    loading: PropTypes.bool.isRequired,
    isSignedIn: PropTypes.bool.isRequired,
    signedInUser: PropTypes.object.isRequired,
    signOutFunc: PropTypes.function
};

function mapStateToProps(state, ownProps) {
  return {
      loading: state.ajaxCallsInProgress > 0,
      isSignedIn: state.registerReducer.isSignedIn,
      signedInUser: state.registerReducer.user
  };
}

function mapDispatchToProps(dispatch) {
  return {
      actions: bindActionCreators(authActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
