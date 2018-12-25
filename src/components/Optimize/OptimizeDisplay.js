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

function findTopSongs(attribute, allAnalyzedTracks) {
  if (_.isEmpty(allAnalyzedTracks)) {
    return [];
  }

  // TODO: resolve bug in here...
  const mappedAttribute = ATTRIBUTE_MAPPING[attribute.toUpperCase()];
  const sortedTracks = _.reverse(_.sortBy(allAnalyzedTracks, [mappedAttribute]));

  let cache = {};
  const result = [];
  for (let i = 0; i < SONG_NUM; i++) {
    const track = sortedTracks[i];
    let numOfUniqTracks = 0;
    if (!cache[track.id]) {
      cache = {
        ...cache,
        [track.id]: track.id,
      };
      result.push(track);
      numOfUniqTracks++;
    }

    // if we have found repeats exit with same number
    if (numOfUniqTracks > SONG_NUM) {
      return;
    }
  }

  return result;
}

class OptimizeDisplay extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      topTracks: []
    };
  }

  componentWillReceiveProps(nextProps) {
    if (!_.isEqual(this.props.attribute, nextProps.attribute)) {
      const topTracks = findTopSongs(nextProps.attribute, nextProps.allAnalyzedTracks);
      this.setState({ topTracks });
      this.props.setTopTracks(topTracks);
    }
  }

  render() {
    return (
      <div className="optimize-display col-md-6">
        {!_.isEmpty(this.props.attribute) && (
          _.map(this.state.topTracks, (track) => (
            <div className="top-track" key={`${track.name}-${Date.now()}`}>
              <span className="artist">{track.artist}</span> - <span className="track">{track.name}</span>
              <span className="rating">({track[ATTRIBUTE_MAPPING[this.props.attribute.toUpperCase()]]})</span>
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
