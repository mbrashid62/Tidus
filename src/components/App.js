// This component handles the App template used on every page.
/* eslint-disable no-undef */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';

class App extends Component {
  disconnectFromSpotify = () => {
      browserHistory.push('/');
      location.reload(true);
  };

  render() {
    return (
      <div className="container-fluid">
        {this.props.children}
        <div className="tidus-footer">
            <p>Tidus is built with React, Redux, ES6, and other cool technologies.</p>
            <a href="http://tidus-music.herokuapp.com/">http://tidus-music.herokuapp.com/</a>
            <p>This app is developed by <a href="https://github.com/mbrashid62">mbrashid62</a>.</p>
            {this.props.hasAccessToken && !this.props.loading && (
              <p>All done? <a href="" onClick={this.disconnectFromSpotify}>Log Out</a></p>
            )}
        </div>
      </div>
    );
  }
}

App.defaultPropTypes = {
    actions: {},
    children: {},
    loading: false,
    hasAccessToken: false,
};

App.propTypes = {
    children: PropTypes.object.isRequired,
    loading: PropTypes.bool.isRequired,
    hasAccessToken: PropTypes.bool.isRequired,
};

function mapStateToProps(state) {
  return {
      hasAccessToken: state.spotifyReducer.hasAccessToken,
      loading: state.ajaxCallsInProgress > 0
  };
}

export default connect(mapStateToProps)(App);
