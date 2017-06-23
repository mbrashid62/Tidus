import React, { PropTypes } from 'react';

const Loader = ({loading}) => {
    return (
        <div className="loader-container">
            {loading && <div className="loader spin" />}
        </div>
    );
};

Loader.propTypes = {
    loading: PropTypes.bool.isRequired
};

export default Loader;
