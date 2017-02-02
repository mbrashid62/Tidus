import React from 'react';
import {Link} from 'react-router';

class HomePage extends React.Component {
  render() {
    return (
        <div className="container-fluid">
            <div className="jumbotron">
                <h1>Welcome to Tidus!</h1>
                <p>As you may or may not know, Spotify uses a variety of different attributes
                    to categorize songs</p>
                <p>This app lets you view all of this data for your carefully curated playlists. Go to the Dashboard to try it out!</p>
                <Link to="about" className="btn btn-primary btn-lg">Learn more</Link>
            </div>
        </div>
    );
  }
}

export default HomePage;
