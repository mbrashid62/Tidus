import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

const attributeToAdjective = (attr) => {
  switch (attr) {
    case 'Acousticness':
      return 'Acoustic';
    case 'Danceability':
      return 'Danceable';
    case 'Energy':
      return 'Energetic';
    case 'Loudness':
      return 'Loudest';
    case 'Valence':
      return 'Happiest';
    default:
      return '';
  }
};

const getString = (attr) => {
  const omitMost = attr === 'Loudness' || attr === 'Valence';
  if (omitMost) {
    return `Your ${attributeToAdjective(attr)} songs`;
  }
  return `Your most ${attributeToAdjective(attr)} songs`;
};

const OptimizeTitle = ({ selectedAttr }) => (
  <div className="row">
    <div className="col-md-12 text-center">
      {_.isEmpty(selectedAttr) ? <h1>Select a checkbox below.</h1> : <h1>{getString(selectedAttr)}</h1>}
    </div>
  </div>
);

OptimizeTitle.propTypes = {
  selectedAttr: PropTypes.string.isRequired
};

export default OptimizeTitle;
