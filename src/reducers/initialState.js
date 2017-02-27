export default { // this is what the store looks like
  registeredUser: {
      user: {},
      msg: '',
      isRegistered: false,
      isSignedIn: false
  },
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
