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
    const newlySortedTracks = _.reverse(_.sortBy(tracks, [attribute])); // By default lodash sorts by ascending order. I want descending to be user's first
    if (_.isEqual(newlySortedTracks, tracks)) { // if array is already sorted by selected attribute, reverse it
        _.reverse(newlySortedTracks);
    }
    return newlySortedTracks;
}