import React, { PropTypes } from 'react';

const ErrorMsg = (error) => {
    debugger;
    return (
        <div>
            <p>Error</p>
        </div>
    );
};

ErrorMsg.propTypes = {
  errorMsg: PropTypes.string.isRequired
};

export default ErrorMsg;