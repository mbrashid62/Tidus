import React from 'react';

class AboutPage extends React.Component {
  render() {
    return (
    <div className="container-fluid">
        <div className="jumbotron">
            <h1>About</h1>
            <p>This application uses React, Redux, React Router and a variety of other helpful libraries.</p>
            <p>You may know that Spotify offers a variety of data accessible through their public and private APIs.</p>
            <p>This app uses the Spotify API to connect your account and fetch your playlists.</p>
            <p>After you have retrieved your playlists, you can then use this app to look at various
                track data Spotify keeps for each one of your songs.</p>
            <p>Click the dashboard link above to try it out!</p>
        </div>
    </div>
    );
  }
}

export default AboutPage;
