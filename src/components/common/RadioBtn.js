import React from 'react';
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
  btn: React.PropTypes.object.isRequired,
  onClick: React.PropTypes.func.isRequired
};

export default RadioBtn;
