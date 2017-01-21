import React, { PropTypes } from 'react';

const RegisterMsg = (msg) => {
    debugger;
    return (
        <div>
            <p>{msg.msg}</p>
        </div>
    );
};

RegisterMsg.propTypes = {
  msg: PropTypes.string.isRequired
};

export default RegisterMsg;