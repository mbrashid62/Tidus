import React, { PropTypes } from 'react';
import TrackTitle from './TrackTitle'

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
    track: React.PropTypes.object.isRequired
};

export default SpotifyTrack;
