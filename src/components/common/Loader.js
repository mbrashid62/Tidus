import React, { PropTypes } from 'react';

const Loader = ({loading}) => {
    return (
        <div>
            {loading && <div className="loader spin" />}
        </div>
    );
};

Loader.propTypes = {
    loading: PropTypes.bool.isRequired
};

export default Loader;
