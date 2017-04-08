import React from 'react';
import {Link} from 'react-router';
import Button from 'react-button';

class HomePage extends React.Component {
  render() {
    return (
        <div className="container-fluid">
            <div className="jumbotron">
                <h1>Welcome to Tidus.</h1>
                <p>How does Spotify know what songs are <strong>energetic</strong> enough for your workout playlist?</p>
                <p>The answer is because Spotify's engineering team collects audio data for all of their songs. This helps them
                determine what tracks are appropriate for the gym, for a party, for a lazy sunday at home, and more.</p>
                <p>This app lets you peak underneath the hood and see some audio data Spotify has for your playlists.</p>
                <p>Please login and then visit the Dashboard to try it out.</p>
                <Button className="btn btn-lg action-btn" onClick={()=> {}} theme={{overStyle:{background:'black'}}}>Connect to Spotify</Button>
            </div>
        </div>
    );
  }
}

export default HomePage;
