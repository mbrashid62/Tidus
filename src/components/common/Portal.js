import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { isEmpty } from 'lodash';

class Portal extends Component {
  constructor(props, context) {
    super(props, context);
    this.isPortalReady = false;
    this.portalRootEl = null;
    this.portalContainer = document.createElement('div');
    this.portalContainer.classList.add('portal');
    this.portalContainer.classList.add(props.uniqPortalClass);
  }

  componentDidUpdate(prevProps) {
    const { rootEl } = this.props;

    // setup append children to portal root
    if (rootEl && isEmpty(prevProps.rootEl) && !this.isPortalReady) {
      rootEl.appendChild(this.portalContainer);
    }
  }


  componentWillUnmount() {
    if (this.portalRootEl) {
      this.portalRootEl.removeChild(this.portalContainer);
      this.isPortalReady = false;
    }
  }

  render() {
    return ReactDOM.createPortal(this.props.children, this.portalContainer);
  }
}

Portal.propTypes = {
  rootEl: PropTypes.object.isRequired,
  uniqPortalClass: PropTypes.string.isRequired,
  children: PropTypes.object.isRequired
};

export default Portal;