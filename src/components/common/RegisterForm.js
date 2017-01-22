
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import * as authActions from '../../actions/authActions';
import { bindActionCreators } from 'redux';
import TextInput from '../common/TextInput';
import RegisterMsg from './RegisterMsg';
import Button from 'react-button';
import { browserHistory } from 'react-router';

export class RegisterForm extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            user: {},
            error: false,
            validForm: false,
            isRegistered: false
        };
        this.updateRegisterForm = this.updateRegisterForm.bind(this);
        this.registerUser = this.registerUser.bind(this);
        this.redirectToHomePage = this.redirectToHomePage.bind(this);
    }

    componentWillMount() {
        this.props.actions.initStateChangeHook();
        if(this.props.isSignedIn) { // if user navigates to register form page while already being signed in
            this.redirectToHomePage();
        }
    }

    componentWillReceiveProps(nextProps) { // update state when props change - called anytime props have changed
        if (nextProps.isSignedIn) { // if user is now signed in redirect
            this.redirectToHomePage();
        }
    }

    redirectToHomePage() {
        browserHistory.push('/');
    }

    registerUser() { // registers user and then signs user in
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
        return this.setState({
            user: {
                email: user.email,
                password: user.password
            }}
        );
    }

    render () {
        let registerMsg = this.props.registerMsg;
        let registeredUser = this.props.registeredUser;
        return (
            <form>
                <h1>Register</h1>
                <TextInput
                    name="email"
                    type="text"
                    label="Email"
                    onChange={this.updateRegisterForm}
                />

                <TextInput
                    name="password"
                    type="password"
                    label="Password"
                    onChange={this.updateRegisterForm}
                />

                <TextInput
                    name="password-repeat"
                    type="password"
                    label="Repeat Password"
                    onChange={this.updateRegisterForm}
                />
                <RegisterMsg registereduser={registeredUser} msg={registerMsg}/>
                <Button onClick={this.registerUser}>Sign Up</Button>
            </form>
        );
    }
}

RegisterForm.defaultProps = {
    registerMsg: 'Hello!',
    registeredUser: {},
    isSignedIn: false
};

RegisterForm.propTypes = {
    actions: PropTypes.object.isRequired,
    isSignedIn: PropTypes.bool.isRequired,
    registerMsg: PropTypes.string.isRequired,
    registeredUser: PropTypes.object.isRequired
};

function mapStateToProps(store) { // connect props to global state object
    return {
        registeredUser: store.registeredUser.user,
        registerMsg: store.registeredUser.msg,
        isRegistered: store.registeredUser.isRegistered,
        isSignedIn: store.registeredUser.isSignedIn
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(authActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(RegisterForm);
