import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import * as authActions from '../../actions/authActions';
import { bindActionCreators } from 'redux';
import TextInput from '../common/TextInput';
import Button from 'react-button';
import { browserHistory } from 'react-router';

export class LoginForm extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            user: {
                email: '',
                password: ''
            }
        };
        this.updateLoginForm = this.updateLoginForm.bind(this);
        this.signInUser = this.signInUser.bind(this);
        this.redirectToDashboard = this.redirectToDashboard.bind(this);
    }

    componentWillMount() {
        this.props.actions.initStateChangeHook();
        if(this.props.isSignedIn) { // if user navigates to login form page while already being signed in
            this.redirectToDashboard();
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.isSignedIn) {
            this.redirectToDashboard();
        }
    }

    redirectToDashboard() {
        browserHistory.push('/dashboard');
    }

    updateLoginForm(event) {
        const field = event.target.name;
        let user = this.state.user;

        if (field == 'email')
            user.email = event.target.value;
        else if (field == 'password')
            user.password = event.target.value;
    }

    signInUser() {
        let email = this.state.user.email;
        let pw = this.state.user.password;
        this.props.actions.signInUser(email, pw);
    }

    render() {
        return (
            <form>
                <h1>Login</h1>
                <TextInput
                    name="email"
                    type="text"
                    label="Email"
                    onChange={this.updateLoginForm}
                />

                <TextInput
                    name="password"
                    type="password"
                    label="Password"
                    onChange={this.updateLoginForm}
                />
                <Button onClick={this.signInUser}>Login</Button>
            </form>
        );
    }
}

LoginForm.defaultProps = {
    isSignedIn: false,
    signInMsg: ''
};

LoginForm.propTypes = {
    actions: PropTypes.object.isRequired,
    isSignedIn: PropTypes.bool.isRequired,
    signInMsg: PropTypes.string.isRequired
};

function mapStateToProps(store, ownProps) {
    return {
        user: store.registerReducer.user,
        isSignedIn: store.registerReducer.isSignedIn,
        signInMsg: store.registerReducer.msg
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(authActions, dispatch)
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
