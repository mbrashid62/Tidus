export function playlistFormatted(playlists) {
    return playlists.map(playlist => {
        return {
            name: playlist.name,
            id: playlist.id
        };
    });
}

export function selectedTracksFormatted(tracks) {
    return tracks.map(track => {
        return {
            artist: track.track.artists[0].name,
            name: track.track.name,
            id: track.track.id
        }
    })
}