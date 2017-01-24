import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import * as authActions from '../../actions/authActions';
import { bindActionCreators } from 'redux';
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
    componentDidMount() {
        if(!this.props.isSignedIn) {
            this.redirectToHomePage();
        }
    }
    componentWillReceiveProps(nextProps) {
        if(!nextProps.isSignedIn) {
            this.redirectToHomePage();
        }
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

RegisterPage.propTypes = {
    registeredUser: React.PropTypes.object.isRequired,
    isSignedIn: React.PropTypes.bool.isRequired
};
function mapStateToProps(store) { // connect props to global state object
    return {
        registeredUser: store.registerReducer.user,
        isSignedIn: store.registerReducer.isSignedIn
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(authActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(RegisterPage);
