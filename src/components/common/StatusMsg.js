import React, { PropTypes } from 'react';

const StatusMsg = ({msg, errors}) => {
    return (
        <div>
            {msg && <p> Uh Oh! We got an error. Please try again.</p>}
            {errors.statusCode && <p id="status-error" className="error">{errors.statusCode}</p>}
            {errors.title && <p id="status-error" className="error">{errors.title}</p>}
            <p id="status-msg" className="error">{msg}</p>
        </div>
    );
};

StatusMsg.propTypes = {
    msg: PropTypes.string,
    errors: PropTypes.object
};

export default StatusMsg;