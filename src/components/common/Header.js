import React, {PropTypes} from 'react';
import { Link, IndexLink } from 'react-router';
import Dashboard from '../main/Dashboard';
import LoadingDots from './LoadingDots';
import Button from 'react-button';

const Header = ({loading, isSignedIn, user, signOutFunc}) => {
  return (
    <nav className="navbar navbar-light">
        <div className="container-fluid">
            <ul className="nav navbar-nav navbar-right">
                <li><IndexLink to="/" activeClassName="active">Home</IndexLink></li>
                {!isSignedIn && <li><Link to="/login" activeClassName="active">Login</Link></li>}
                {!isSignedIn && <li><Link to="/register" activeClassName="active">Register</Link></li>}
                <li><Link to="/about" activeClassName="active">About</Link></li>
                {isSignedIn && <li><Link to="/dashboard" activeClassName="active">Dashboard</Link></li>}
                {isSignedIn && <li><p className="navbar-text">You are logged in as {user.email}!</p></li>}
                {isSignedIn && <li><Button className="btn btn-default btn-sm navbar-btn logout-btn" onClick={signOutFunc}>Logout</Button></li>}
            </ul>
        </div>
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
    user: PropTypes.object.isRequired,
    signOutFunc: PropTypes.func
};

export default Header;
