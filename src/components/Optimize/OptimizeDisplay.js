import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import _ from 'lodash';
import * as spotifyActions from "../../actions/spotifyActions";

const ATTRIBUTE_MAPPING = {
  ACOUSTICNESS: 'acousticness',
  DANCEABILITY: 'danceability',
  ENERGY: 'energy',
  LOUDNESS: 'loudness',
  VALENCE: 'valence'
};

const SONG_NUM = 10;

// TODO: Refactor this so that it's not firing after we
// process every playlists one by one. Only fire when we have finished processing
function findTopSongs(attribute, allAnalyzedTracks) {
  if (_.isEmpty(allAnalyzedTracks)) return [];

  const mappedAttribute = ATTRIBUTE_MAPPING[attribute.toUpperCase()];
  const sortedTracks = _.reverse(_.sortBy(allAnalyzedTracks, [mappedAttribute]));
  return _.dropRight(sortedTracks, sortedTracks.length - SONG_NUM);
}

class OptimizeDisplay extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      topTracks: []
    };
  }


  componentWillReceiveProps(nextProps) {
    const {
      allAnalyzedTracks,
      attribute
    } = this.props;

    if (
      !_.isEqual(allAnalyzedTracks, nextProps.allAnalyzedTracks) ||
      !_.isEqual(attribute, nextProps.attribute)) {

      const topTracks = findTopSongs(nextProps.attribute, nextProps.allAnalyzedTracks);
      this.setState({ topTracks });
      this.props.setTopTracks(topTracks);
    }
  }


  render() {
    const { topTracks } = this.state;
    const { attribute } = this.props;
    return (
      <div className="optimize-display col-md-6">
        {!_.isEmpty(attribute) && (
          _.map(topTracks, (track) => (
            <div className="top-track" key={`${track.name}-${Date.now()}`}>
              <span className="artist">{track.artist}</span> - <span className="track">{track.name}</span>
              <span className="rating">({track[ATTRIBUTE_MAPPING[attribute.toUpperCase()]]})</span>
            </div>
          ))
        )}
      </div>
    );
  }
}

OptimizeDisplay.displayName = 'components/Optimize/OptimizeDisplay';

OptimizeDisplay.propTypes = {
  attribute: PropTypes.string.isRequired,
  allAnalyzedTracks: PropTypes.array.isRequired,
  setTopTracks: PropTypes.func.isRequired,
};

export default connect(() => ({}), ({
  setTopTracks: spotifyActions.setTopTracks,
}))(OptimizeDisplay);
