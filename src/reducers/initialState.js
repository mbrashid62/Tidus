export default { // this is what the store looks like
  spotifyData: {
      url: '',
      code: '',
      accessToken: '',
      hasAccessToken: false,
      spotifyUserID: '',
      hasSpotifyID: false,
      playlists: [],
      analyzedPlaylistName: '',
      analyzedTracks: [],
      selectedPlaylistName: '',
      selectedPlaylistTracks: [],
      hasFoundTracks: false,
      error: {}
  },
  ajaxCallsInProgress: 0
};
