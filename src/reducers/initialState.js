export default { // this is what the store looks like
  spotifyData: {
      url: '',
      code: '',
      accessToken: '',
      spotifyUserID: '',
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
