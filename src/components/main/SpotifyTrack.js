import React  from 'react';
import PropTypes from 'prop-types';
import TrackTitle from './TrackTitle';

const SpotifyTrack= ({track}) => {
    return (
        <div>
            <div className="row">
                <div className="col-md-12 text-right">
                    <TrackTitle track={track}/>
                </div>
            </div>
        </div>
    );
};

SpotifyTrack.propTypes = {
    track: PropTypes.object.isRequired
};

export default SpotifyTrack;
