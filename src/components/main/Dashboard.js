import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import * as authActions from '../../actions/authActions';
import { bindActionCreators } from 'redux';
import TextInput from '../common/TextInput';
import Button from 'react-button';
import { browserHistory } from 'react-router';

export class RegisterPage extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.state = {};

        this.redirectToHomePage = this.redirectToHomePage.bind(this);
    }

    componentWillMount() {
        if(!this.props.isSignedIn) {
            this.redirectToHomePage();
        }
    }

    componentWillReceiveProps(nextProps) { // update state when props change - called anytime props have changed

    }

    redirectToHomePage() {
        browserHistory.push('/');
    }

    render () {
        return (
            <div className="jumbotron">
                <h1>Welcome to the dashboard</h1>
                <p>this is where cool stuff happens</p>
            </div>
        );
    }
}



function mapStateToProps(store) { // connect props to global state object
    return {
        registeredUser: store.registerReducer.user,
        registerMsg: store.registerReducer.msg,
        isRegistered: store.registerReducer.isRegistered,
        isSignedIn: store.registerReducer.isSignedIn
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(authActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(RegisterPage);
