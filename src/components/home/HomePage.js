import React from 'react';
import {Link} from 'react-router';

class HomePage extends React.Component {
  render() {
    return (
        <div className="container-fluid">
            <div className="jumbotron">
                <h1>Welcome to Tidus.</h1>
                <p>Have you ever wondered how Spotify knows what songs are <strong>energetic</strong> enough to put on your workout playlist?</p>
                <p>The answer is because Spotify's engineering team collects attribute data for all of their songs. This helps them
                determine what tracks sound energetic, chill, lively, etc.</p>
                <p>This app lets you peak underneath the hood and analyze some of the data Spotify has collected for your playlists.</p>
                <p>Please login and then visit the Dashboard to try it out.</p>
            </div>
        </div>
    );
  }
}

export default HomePage;
