import React from 'react';
import TextInput from '../common/TextInput';
import Button from 'react-button';
import StatusMsg from './StatusMsg';

const RegisterForm = ({user, onChange, registerMsg, registerUser, errors}) => {
    return (
        <div className="container">
            <div className="jumbotron">
                <h1>Register</h1>
                <p>You can sign up by filling out the form below.</p>
            </div>
            <form className="form">
               <TextInput
                    name="email"
                    type="text"
                    label="Email"
                    value={user.email}
                    onChange={onChange}
                />

                <TextInput
                    name="password"
                    type="password"
                    label="Password"
                    value={user.password}
                    onChange={onChange}
                />

                <TextInput
                    name="passwordRepeat"
                    type="password"
                    label="Repeat Password"
                    value={user.passwordRepeat}
                    onChange={onChange}
                />
                <Button className="action-btn" onClick={registerUser}>Sign Up</Button>
                <StatusMsg msg={registerMsg} errors={errors}/>
            </form>
        </div>
    );
};

RegisterForm.propTypes = {
    user: React.PropTypes.object.isRequired,
    onChange: React.PropTypes.func.isRequired,
    registerMsg: React.PropTypes.string.isRequired,
    registerUser: React.PropTypes.func,
    errors: React.PropTypes.object
};

export default RegisterForm;

