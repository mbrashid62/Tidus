import React from 'react';
import TextInput from '../common/TextInput';
import Button from 'react-button';
import StatusMsg from './StatusMsg';


const RegisterForm = ({user, onChange, registerMsg, registerUser, errors}) => {
    return (
        <form>
            <h1>Register</h1>
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
            <Button className="btn btn-default" onClick={registerUser}>Sign Up</Button>
            <StatusMsg msg={registerMsg} errors={errors}/>
        </form>
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

