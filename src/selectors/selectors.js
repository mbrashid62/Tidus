import _ from 'lodash';

export function playlistFormatted(playlists) {
    return playlists.map(playlist => {
        return {
            name: playlist.name,
            id: playlist.id,
            hasAnalyzed: false
        };
    });
}

export function selectedTracksFormatted(tracks) {
    return tracks.map(track => {
        return {
            artist: track.track.artists[0].name,
            name: track.track.name,
            id: track.track.id
        };
    });
}

export function formatTracksObjForIdsAndJustTracks(spotifyPlaylistTracksObj) {
    let trackIds = [];
    let justTracks = [];
    _.forEach(spotifyPlaylistTracksObj, ((object) => {
        trackIds.push(object.track.id);
        justTracks.push(object.track);
    }));
    return {trackIds, justTracks};
}

export function addTrackNameAndArtist(audioFeaturesArray, justTracks) {
    _.forEach(audioFeaturesArray, ((trackAudioData) => {
        const id = trackAudioData.id;
        const track = _.find(justTracks, {id: id});
        trackAudioData.name = track.name;

        if(track.artists.length > 1) {
            trackAudioData.artist = trackAudioData.artist = track.artists[0].name + " & (Other Artists)";
        } else {
            trackAudioData.artist = track.artists[0].name;
        }
    }));
    return audioFeaturesArray;
}

export function buildSpotifyAuthURL(credentials) {
    let url = 'https://accounts.spotify.com/authorize';
    url += '?response_type=token';
    url += '&client_id=' + encodeURIComponent(credentials.clientId);
    url += '&scope=' + encodeURIComponent(credentials.scope);
    url += '&redirect_uri=' + encodeURIComponent(credentials.redirect_uri);
    url += '&state=' + encodeURIComponent(credentials.state);

    return url;
}

export function sortTracks(attribute, tracks) {
    const newlySortedTracks = _.sortBy(tracks, [attribute]);
    if (_.isEqual(newlySortedTracks, tracks)) { // if array is already sorted by selected attribute, reverse it
        _.reverse(newlySortedTracks);
    }
    return newlySortedTracks;
}