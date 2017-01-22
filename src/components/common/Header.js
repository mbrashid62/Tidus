import React, {PropTypes} from 'react';
import { Link, IndexLink } from 'react-router';
import LoadingDots from './LoadingDots';
import Button from 'react-button';

const Header = ({loading, isSignedIn, user, signOutFunc}) => {
  return (
    <nav>
      <IndexLink to="/" activeClassName="active">|  Home  |</IndexLink>
        {!isSignedIn && <Link to="/login" activeClassName="active">  Login  |</Link>}
        {!isSignedIn && <Link to="/register" activeClassName="active">  Register  |</Link>}
        <Link to="/courses" activeClassName="active">  Courses  |</Link>
        <Link to="/about" activeClassName="active">  About  |</Link>
        {isSignedIn && <Button onClick={signOutFunc}>  Sign Out  |</Button>}
        {isSignedIn && <p>Hello, {user.email}!</p>}
        {loading && <LoadingDots interval={100} dots={20}/>}
    </nav>
  );
};
Header.defaultPropTypes = {

    loading: false,
    isSignedIn: false,
    user: {}
};

Header.propTypes = {
    loading: PropTypes.bool.isRequired,
    isSignedIn: PropTypes.bool.isRequired,
    user: PropTypes.object.isRequired
};

export default Header;
