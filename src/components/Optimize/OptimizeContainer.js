import React from 'react';

import OptimizeTitle from './OptimizeTitle';
import RadioBtnGroup from '../common/RadioBtnGroup';

class OptimizeContainer extends React.Component {
  constructor(props) {
      super(props);
  }

  render () {
    return (
      <div>
        <OptimizeTitle/>
        <RadioBtnGroup/>
      </div>
    );
  }
}

export default OptimizeContainer;