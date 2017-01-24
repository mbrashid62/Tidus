import React, { PropTypes } from 'react';
import TextInput from '../common/TextInput';
import Button from 'react-button';
import StatusMsg from '../common/StatusMsg';

const LoginForm = ({onChange, loginUser, loginMsg, errors}) => {
    return (
        <form>
            <h1>Login</h1>
            <TextInput
                name="email"
                type="text"
                label="Email"
                onChange={onChange}
            />

            <TextInput
                name="password"
                type="password"
                label="Password"
                onChange={onChange}
            />
            <Button onClick={loginUser}>Login</Button>

            <StatusMsg msg={loginMsg} errors={errors}/>
        </form>
    );
};

LoginForm.propTypes = {
    onChange: React.PropTypes.func.isRequired,
    loginUser: React.PropTypes.func.isRequired,
    loginMsg: React.PropTypes.string,
    errors: React.PropTypes.object.isRequired
};

export default LoginForm;
