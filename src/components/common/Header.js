import React, {PropTypes} from 'react';
import { Link, IndexLink } from 'react-router';

const Header = ({loading}) => {
  return (
    <nav className="navbar navbar-light">
        <div className="container-fluid">
            <ul className="nav navbar-nav navbar-right">
                <li><IndexLink to="/" activeClassName="active">Home</IndexLink></li>
                {/*{!isSignedIn && <li><Link to="/login" activeClassName="active">Login</Link></li>}*/}
                {/*{!isSignedIn && <li><Link to="/register" activeClassName="active">Register</Link></li>}*/}
                <li><Link to="/about" activeClassName="active">About</Link></li>
                {/*{isSignedIn && <li><p className="navbar-text">You are logged in as <strong>{user.email}</strong>!</p></li>}*/}
                {/*{isSignedIn && <li><Button className="btn btn-default btn-sm navbar-btn logout-btn" onClick={signOutFunc} theme={{overStyle:{background:'black'}}}>Logout</Button></li>}*/}
            </ul>
        </div>
    </nav>
  );
};

Header.defaultPropTypes = {
    loading: false
};

Header.propTypes = {
    loading: PropTypes.bool.isRequired
};

export default Header;
