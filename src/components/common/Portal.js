import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

class Portal extends Component {
  constructor(props, context) {
    super(props, context);
    this.portalRootEl = null;
    this.portalContainer = document.createElement('div');
    this.portalContainer.classList.add('portal');
  }

  componentDidMount() {
    const { rootClass } = this.props;

    if (rootClass) {
      this.portalRootEl = document.getElementsByClassName(rootClass)[0];
      this.portalRootEl.appendChild(this.portalContainer);
    }
  }

  componentWillUnmount() {
    if (this.portalRootEl) {
      this.portalRootEl.removeChild(this.portalContainer);
    }
  }

  render() {
    return ReactDOM.createPortal(this.props.children, this.portalContainer);
  }
}

Portal.propTypes = {
  rootClass: PropTypes.string.isRequired,
  children: PropTypes.array.isRequired
};

export default Portal;