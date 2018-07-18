import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import RadioBtnGroup from '../common/RadioBtnGroup';
import OptimizeTitle from './OptimizeTitle';
import OptimizeDisplay from './OptimizeDisplay';
import Portal from "../common/Portal";

class OptimizeContainer extends Component {
  render () {
    const {
      selectedAttr,
      allAnalyzedTracks
    } = this.props;

    return (
      <div className="optimize-container">
        <hr className="divider" />
        <OptimizeTitle
          selectedAttr={selectedAttr}
        />
        <RadioBtnGroup/>
        <hr className="divider" />
        <OptimizeDisplay
          attribute={selectedAttr}
          allAnalyzedTracks={allAnalyzedTracks}
        />
        {/*<Portal*/}
          {/*rootClass="container-fluid"*/}
        {/*>*/}
          {/*<div>I am a portal...</div>*/}
        {/*</Portal>*/}
      </div>
    );
  }
}

OptimizeContainer.propTypes = {
  selectedAttr: PropTypes.string.isRequired,
  allAnalyzedTracks: PropTypes.array.isRequired
};

function mapStateToProps(store) {
  return {
    selectedAttr: store.optimizeReducer.selectedAttr,
    allAnalyzedTracks: store.spotifyReducer.allAnalyzedTracks
  };
}
export default connect(mapStateToProps)(OptimizeContainer);