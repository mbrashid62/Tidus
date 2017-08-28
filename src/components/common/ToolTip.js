import React, { PropTypes } from 'react';
import ReactTooltip from 'react-tooltip';

const ToolTip = ({ toolTipId, copy }) => {
  return (
    <div>
      <ReactTooltip id={toolTipId}>
        <span>{copy}</span>
      </ReactTooltip>
    </div>
  );
};

ToolTip.propTypes = {
  toolTipId: PropTypes.string.isRequired,
  copy: PropTypes.string
};

export default ToolTip;
