import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

const RadioBtn = ({ btn, onClick }) => {
  return (
    <div className={cn(`radio-btn`, `${btn.label}`)}>
      <label htmlFor={btn.label}>{btn.label}</label>
      <input
        type="checkbox"
        name={btn.label}
        value={btn.label}
        id={btn.label}
        onChange={onClick}
        checked={btn.isClicked}
      >
      </input>
    </div>
  );
};

RadioBtn.propTypes = {
  btn: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired
};

export default RadioBtn;
