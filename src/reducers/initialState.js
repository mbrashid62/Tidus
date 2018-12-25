export default { // this is what the store looks like
    spotifyData: {
      url: '',
      code: '',
      accessToken: '',
      spotifyUserID: '',
      playlists: [],
      activePlaylistName: '',
      activeAnalyzedTracks: [],
      selectedPlaylistName: '',
      allAnalyzedTracks: [],
      hasFoundTracks: false,
      error: {},
      createPlaylistStatus: 'IDLE',
      topTracks: [],
    },
    optimizeData: {
      btnStatus: [
          {
              label: 'Acousticness',
              isClicked: false
          },
          {
              label: 'Danceability',
              isClicked: false
          },
          {
              label: 'Energy',
              isClicked: false
          },
          {
              label: 'Loudness',
              isClicked: false
          },
          {
              label: 'Valence',
              isClicked: false
          }
      ],
      selectedAttr: ''
    },
    ajaxCallsInProgress: 0
};
