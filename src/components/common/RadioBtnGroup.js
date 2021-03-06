import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import _ from 'lodash';

import * as optimizeActions from '../../actions/optimizeActions';
import RadioBtn from '../common/RadioBtn';

class RadioBtnGroup extends React.Component {
    constructor(props) {
        super(props);

        this.handleBtnClick = this.handleBtnClick.bind(this);
    }

    handleBtnClick(e) {
        const { btnStatus, actions } = this.props;
        actions.handleOptimizeBtnChange(btnStatus,  e.target.id);
        actions.handleSelectOptAttr(e.target.id);
    }

    render() {
        const { btnStatus } = this.props;

        return (
            <div className="radio-btn-group col-md-12">
              {_.map(btnStatus, (btn) => (
                <RadioBtn
                    btn={btn}
                    key={`btn-${btn.label}`}
                    id={`btn-${btn.label}`}
                    onClick={this.handleBtnClick}
                />
              ))}
            </div>

        );
    }
}

RadioBtnGroup.propTypes = {
  btnStatus: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired
};

function mapStateToProps(store) {
    return {
      btnStatus: store.optimizeReducer.btnStatus
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(optimizeActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(RadioBtnGroup);