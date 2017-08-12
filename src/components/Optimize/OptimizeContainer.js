import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import OptimizeTitle from './OptimizeTitle';
import RadioBtnGroup from '../common/RadioBtnGroup';

class OptimizeContainer extends React.Component {
  constructor(props) {
      super(props);
  }

  componentWillReceiveProps(nextProps, nextContext) {

  }

  render () {
    const { selectedAttr } = this.props;
    return (
      <div className="optimize-container">
        <OptimizeTitle
          selectedAttr={selectedAttr}
        />
        <RadioBtnGroup/>
      </div>
    );
  }
}

OptimizeContainer.propTypes = {
  selectedAttr: PropTypes.string.isRequired
};

function mapStateToProps(store) {
  return {
    selectedAttr: store.optimizeReducer.selectedAttr
  };
}
export default connect(mapStateToProps)(OptimizeContainer);