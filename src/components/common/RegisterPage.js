
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import * as authActions from '../../actions/authActions';
import { bindActionCreators } from 'redux';
import TextInput from '../common/TextInput';
import RegisterForm from'./RegisterForm';

import { browserHistory } from 'react-router';

export class RegisterPage extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            user: {},
            errors: {}
        };
        this.updateRegisterForm = this.updateRegisterForm.bind(this);
        this.registerUser = this.registerUser.bind(this);
        this.redirectToDashboard = this.redirectToDashboard.bind(this);
    }

    componentDidMount() {
        this.props.actions.initStateChangeHook();
        if(this.props.isSignedIn) { // if user navigates to register form page while already being signed in
            this.redirectToDashboard();
        }
    }

    componentWillReceiveProps(nextProps) { // update state when props change - called anytime props have changed
        if (nextProps.isSignedIn) { // if user is now signed in redirect
            this.redirectToDashboard();
        }
    }

    redirectToDashboard() {
        browserHistory.push('/dashboard');
    }

    registerFormIsValid() {
        let formIsValid = true;
        let errors={};
        if(this.state.user.email == '' || this.state.user.email == undefined) {
            errors.title = 'You must enter an email.';
            formIsValid = false;
        }

        if(this.state.user.password == '' || this.state.user.password == undefined) {
            errors.title = 'You must enter a password.';
            formIsValid = false;
        }

        if(this.state.user.password.length < 6) {
            errors.title = 'Your password must be at least six characters long.';
            formIsValid = false;
        }

        if(this.state.user.password !== this.state.user.passwordRepeat) {
            errors.title = 'Your passwords aren\'t matching.';
            formIsValid = false;
        }

        this.setState({errors:errors});
        return formIsValid;
    }

    registerUser() { // registers user and then signs user in

        if(!this.registerFormIsValid()) {
            return;
        }
        let email = this.state.user.email;
        let pw= this.state.user.password;
        this.props.actions.createUser(email, pw);
    }

    updateRegisterForm(event) {
        const field = event.target.name;
        let user = this.state.user;

        if (field == 'email')
            user.email = event.target.value;
        else if (field == 'password')
            user.password = event.target.value;
        else if (field == 'passwordRepeat')
            user.passwordRepeat = event.target.value;
        return this.setState({
            user: {
                email: user.email,
                password: user.password,
                passwordRepeat: user.passwordRepeat
            }}
        );
    }

    render () {
        return (
            <RegisterForm
                user={this.state.user}
                onChange={this.updateRegisterForm}
                registerMsg={this.props.registerMsg}
                registerUser={this.registerUser}
                errors={this.state.errors}
            />
        );
    }
}

RegisterPage.defaultProps = {
    registerMsg: 'Hello!',
    registeredUser: {},
    isSignedIn: false
};

RegisterPage.propTypes = {
    actions: PropTypes.object.isRequired,
    isSignedIn: PropTypes.bool.isRequired,
    registerMsg: PropTypes.string.isRequired,
    registeredUser: PropTypes.object.isRequired
};

function mapStateToProps(store) { // connect props to global state object
    return {
        registeredUser: store.registerReducer.user,
        registerMsg: store.registerReducer.msg,
        isSignedIn: store.registerReducer.isSignedIn
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(authActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(RegisterPage);
