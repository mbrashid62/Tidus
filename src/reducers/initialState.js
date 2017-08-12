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
    optimizeData: {
      btnStatus: [
          {
              label: 'Acousticiness',
              isClicked: true
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
      selectedAttr: 'Acoustic'
    },
    ajaxCallsInProgress: 0
};
