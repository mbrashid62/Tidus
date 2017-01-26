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
            name: track.track.name,
            id: track.track.id
        }
    })
}