// This component handles the App template used on every page.
import React, {PropTypes} from 'react';
import Header from './common/Header';
import {connect} from 'react-redux';
import Button from 'react-button';

class App extends React.Component {

    constructor(props, context) {
        super(props, context);
        // this.redirectToHomePage = this.redirectToHomePage.bind(this);
    }

    componentWillMount() {
    }

    render() {
      return (
          <div className="container-fluid">
            <Header
              loading={this.props.loading}
            />
            {this.props.children}
            <div className="tidus-footer">
                <p>Tidus is built with React, Redux, ES6, and other cool technologies.</p>
                <a href="http://tidus-music.herokuapp.com/">http://tidus-music.herokuapp.com/</a>
                <p>This app is developed by <a href="https://github.com/mbrashid62">mbrashid62</a>.</p>
            </div>
          </div>
      );
    }
}

App.defaultPropTypes = {
    actions: {},
    children: {},
    loading: false
};

App.propTypes = {
    children: PropTypes.object.isRequired,
    loading: PropTypes.bool.isRequired
};

function mapStateToProps(state, ownProps) {
  return {
      loading: state.ajaxCallsInProgress > 0
  };
}

export default connect(mapStateToProps)(App);
