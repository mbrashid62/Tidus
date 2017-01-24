import React, { PropTypes } from 'react';

const StatusMsg = ({msg, errors}) => {
    return (
        <div>
            <p className="bg-danger">{msg}</p>
            <p className="bg-warning">{errors.title}</p>
        </div>
    );
};

StatusMsg.propTypes = {
    msg: PropTypes.string,
    errors: PropTypes.object
};

export default StatusMsg;