
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import * as registerActions from '../../actions/registerActions';
import { bindActionCreators } from 'redux';
import TextInput from '../common/TextInput';
import RegisterMsg from './RegisterMsg';
import Button from 'react-button';

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
    }

    componentWillReceiveProps(nextProps) { // update state when props change - called anytime props have changed
        debugger;
    }
    registerUser() {
        let email = this.state.user.email;
        let pw= this.state.user.password;

        this.props.actions.createUser(email, pw)
            .then((user) => {
                debugger; // the async request is successful but execution doesn't pause here
            })
            .catch((error) => {
                debugger; // instead i receive an error here that says, "Uncaught (in promise) RangeError: Maximum call stack size exceeded"
            });
    }

    updateRegisterForm(event) {
        debugger;
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

        // if (registerMsg == 'Successful Registration!') {
        // }
        debugger;
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
    registeredUser: {}
};
RegisterForm.propTypes = {
    actions: PropTypes.object.isRequired
};

function mapStateToProps(store) { // connect props to global state object
    debugger;
    let user, msg, mostRecentAttemptResponse;

    if (store.registeredUser.length == 0) { // if a user hasn't attempted to register yet
        user = {};
        msg = 'Hello!';
    } else {
        mostRecentAttemptResponse = store.registeredUser[store.registeredUser.length - 1];
        user = mostRecentAttemptResponse.registeredUser;
        msg = mostRecentAttemptResponse.registerMsg;
    }

    return {
        registeredUser: user,
        registerMsg: msg
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(registerActions, dispatch)
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(RegisterForm);
