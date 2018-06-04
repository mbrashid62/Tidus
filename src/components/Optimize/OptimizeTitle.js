import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

const OptimizeTitle = ({ selectedAttr }) => {
    return (
      <div>
          <div className="row">
              <div className="col-md-12 text-center">
                {_.isEmpty(selectedAttr) ? (
                  <h1>Select a checkbox below.</h1>
                ) : (
                  <h1>Your top songs for the <strong>{selectedAttr}</strong> attribute</h1>
                )}
              </div>
          </div>
      </div>
    );
};

OptimizeTitle.propTypes = {
  selectedAttr: PropTypes.string.isRequired
};

export default OptimizeTitle;
