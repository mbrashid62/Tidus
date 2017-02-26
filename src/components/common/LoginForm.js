import React, { PropTypes } from 'react';
import TextInput from '../common/TextInput';
import Button from 'react-button';
import StatusMsg from '../common/StatusMsg';
import Loading from 'react-loading-animation';

const LoginForm = ({onChange, loginUser, loginMsg, errors, loading}) => {
    return (
        <div className="container">
            <div className="jumbotron">
                <h1>Login</h1>
                <p>Please login to access this applications' features.</p>
            </div>
            <Loading isLoading={loading} />
            <form className="form">
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
                <Button className="action-btn" onClick={loginUser}>Login</Button>
                <StatusMsg msg={loginMsg} errors={errors}/>
            </form>
        </div>
    );
};

LoginForm.propTypes = {
    onChange: React.PropTypes.func.isRequired,
    loginUser: React.PropTypes.func.isRequired,
    loginMsg: React.PropTypes.string,
    errors: React.PropTypes.object.isRequired,
    loading: React.PropTypes.bool.isRequired
};

export default LoginForm;
