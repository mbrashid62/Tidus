import React from 'react';
import { Link } from 'react-router';
import cn from 'classnames';

class Header extends React.Component {

  constructor(props, context) {
    super(props, context);
  }

  render () {
    const pathName = window.location.pathname;
    const isAboutActive = pathName === '/about';
    const isHomeActive = !isAboutActive;

    return (
      <nav className="navbar navbar-light">
        <div className="container-fluid">
          <ul className="nav navbar-nav navbar-right">
            <li><Link to="/" className={cn({'active': isHomeActive})}>Home</Link></li>
            <li><Link to="/about" className={cn({'active': isAboutActive})}>About</Link></li>
          </ul>
        </div>
      </nav>
    );
  }
}

export default Header;
