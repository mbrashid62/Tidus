import React from 'react';
import {Link} from 'react-router';

class HomePage extends React.Component {
  render() {
    return (
      <div className="jumbotron">
        <h1>Welcome to Tidus!</h1>
        <p>Tidus is built with React, Redux and React Router in ES6.</p>
        <p>The app integrates with Google Firebase to perform various backend services.</p>
        <Link to="about" className="btn btn-primary btn-lg">Learn more</Link>
      </div>
    );
  }
}

export default HomePage;
