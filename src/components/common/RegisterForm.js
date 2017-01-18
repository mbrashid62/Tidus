
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import * as registerActions from '../../actions/registerActions';
import { bindActionCreators } from 'redux';
import TextInput from '../common/TextInput';
import ErrorMsg from '../common/ErrorMsg';
import Button from 'react-button';
import { Link } from 'react-router';

export class RegisterForm extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            user: Object.assign({}, props.user),
            error: false,
            validForm: false,
            registering: false,
            registerError: ''
        };
        this.updateRegisterForm = this.updateRegisterForm.bind(this);
        this.registerUser = this.registerUser.bind(this);
    }

    componentWillReceiveProps(nextProps) { // update state when props change - called anytime props have changed
        debugger;
        this.setState({
                user: Object.assign({}, nextProps.user),
                error: Object.assign({}, nextProps.error)
            });
    }
    registerUser() {
        let email = this.state.user.email;
        let pw= this.state.user.password;
        this.props.actions.createUser(email, pw)
            .then((params) => {
                debugger;
                // return this.setState({ registerError: '' });
            })
            .catch((error) => {
                debugger;
                // return this.setState({ registerError: error });
            });
    }

    updateRegisterForm(event) {
        const field = event.target.name;
        let user = this.state.user;

        if (field == 'email')
            user.email = event.target.value;
        else if (field == 'password') {
            user.password = event.target.value;
        }
        return this.setState({
            user: {
                email: user.email,
                password: user.password
            }}
        );
    }

    render () {
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
                <ErrorMsg errorMsg={this.state.registerError}/>
                {/*<Button>Sign up</Button>*/}
                <Button>Sign Up</Button>
                <Link to="/" onClick={this.registerUser} className="btn btn-primary btn-lg">Sign Up!</Link>
            </form>
        );
    }
}

RegisterForm.propTypes = {
    actions: PropTypes.object.isRequired
};

function mapStateToProps(state, ownProps) {

    let user = ownProps.params;
    user = {
        email: user.email,
        password: user.password
    };

    return { user: user , registerError: ''};
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(registerActions, dispatch)
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(RegisterForm)
