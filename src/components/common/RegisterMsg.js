import React, { PropTypes } from 'react';

const RegisterMsg = ({msg, errors}) => {
    return (
        <div>
            <p className="bg-danger">{msg}</p>
            <p className="bg-warning">{errors.title}</p>
        </div>
    );
};

RegisterMsg.propTypes = {
    msg: PropTypes.string.isRequired,
    errors: PropTypes.object.isRequired
};

export default RegisterMsg;