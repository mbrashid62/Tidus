import React from 'react';
import TextInput from '../common/TextInput';
import Button from 'react-button';
import StatusMsg from './StatusMsg';
import Loading from 'react-loading-animation';

const RegisterForm = ({user, onChange, registerMsg, registerUser, errors, loading}) => {
    const buttonTheme = { overStyle: { background: 'black' } };
    return (
        <div className="container-fluid">
            <div className="jumbotron">
                <h1>Register</h1>
                <p>You can sign up by filling out the form below.</p>
            </div>
            <Loading isLoading={loading} />
            <form className="form tidus-form">
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
                <Button className="action-btn" onClick={registerUser} theme={buttonTheme}>Sign Up</Button>
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
    errors: React.PropTypes.object,
    loading: React.PropTypes.bool.isRequired
};

export default RegisterForm;

