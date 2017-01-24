import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import * as authActions from '../../actions/authActions';
import { bindActionCreators } from 'redux';
import LoginForm from'./LoginForm';
import { browserHistory } from 'react-router';

export class LoginPage extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            user: {},
            errors: {}
        };
        this.updateLoginForm = this.updateLoginForm.bind(this);
        this.loginUser = this.loginUser.bind(this);
        this.redirectToDashboard = this.redirectToDashboard.bind(this);
    }

    componentDidMount() {
        this.props.actions.initStateChangeHook();
        if(this.props.isSignedIn) { // if user navigates to register form page while already being signed in
            this.redirectToDashboard();
        }
    }

    componentWillReceiveProps(nextProps) { // update state when props change - called anytime props have changed
        if (nextProps.isSignedIn) { // if user is now signed in redirect them to /dashboard
            this.redirectToDashboard();
        }
    }

    redirectToDashboard() {
        browserHistory.push('/dashboard');
    }

    loginFormIsValid() {
        let formIsValid = true;
        let errors = {};
        if(this.state.user.email == '' || this.state.user.email == undefined) {
            errors.title = 'You must enter an email.';
            formIsValid = false;
        }

        if(this.state.user.password == '' || this.state.user.password == undefined) {
            errors.title = 'You must enter a password.';
            formIsValid = false;
        }

        this.setState({errors:errors});
        return formIsValid;
    }

    loginUser() { // registers user and then signs user in
        if(!this.loginFormIsValid()) {
            return;
        }
        let email = this.state.user.email;
        let pw= this.state.user.password;
        this.props.actions.signInUser(email, pw);
    }

    updateLoginForm(event) {
        const field = event.target.name;
        let user = this.state.user;

        if (field == 'email')
            user.email = event.target.value;
        else if (field == 'password')
            user.password = event.target.value;
        return this.setState({
            user: {
                email: user.email,
                password: user.password
            }}
        );
    }

    render () {
        return (
            <LoginForm
                onChange={this.updateLoginForm}
                loginUser={this.loginUser}
                loginMsg={this.props.loginMsg}
                errors={this.state.errors}
            />
        );
    }
}

LoginPage.defaultProps = {
    registerMsg: 'Hello!',
    registeredUser: {},
    isSignedIn: false
};

LoginPage.propTypes = {
    actions: PropTypes.object.isRequired,
    isSignedIn: PropTypes.bool.isRequired,
    loginMsg: PropTypes.string.isRequired,
    registeredUser: PropTypes.object.isRequired
};

function mapStateToProps(store) { // connect props to global state object
    return {
        registeredUser: store.registerReducer.user,
        loginMsg: store.registerReducer.msg,
        isSignedIn: store.registerReducer.isSignedIn
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(authActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
