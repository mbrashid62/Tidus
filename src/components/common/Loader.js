import React from 'react';
import PropTypes from 'prop-types';

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
