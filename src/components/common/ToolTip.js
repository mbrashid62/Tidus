import React, { PropTypes } from 'react';
import ReactTooltip from 'react-tooltip';

const ToolTip = ({ toolTipId, copy }) => {
  return (
    <ReactTooltip id={toolTipId} delayShow={1000}>
      <span>{copy}</span>
    </ReactTooltip>
  );
};

ToolTip.propTypes = {
  toolTipId: PropTypes.string.isRequired,
  copy: PropTypes.string
};

export default ToolTip;
