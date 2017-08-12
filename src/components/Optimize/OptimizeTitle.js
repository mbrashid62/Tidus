import React, { PropTypes }  from 'react';

const OptimizeTitle = ({ selectedAttr }) => {
    return (
      <div>
          <div className="row">
              <div className="col-md-12 text-center">
                <h1>Your top songs for the <strong>{selectedAttr}</strong> attribute</h1>
              </div>
          </div>
      </div>
    );
};

OptimizeTitle.propTypes = {
  selectedAttr: PropTypes.string.isRequired
};

export default OptimizeTitle;
