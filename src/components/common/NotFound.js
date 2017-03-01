import React, { PropTypes } from 'react';

const NotFound = () => {
    return (
        <div className="container-fluid">
            <div className="jumbotron">
                <h1>404 Not Found</h1>
                <p>Whoops...looks something went wrong. Please try again.</p>
            </div>
        </div>
    );
};

NotFound.propTypes = {
};

export default NotFound;

