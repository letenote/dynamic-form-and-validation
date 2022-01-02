import React, { memo } from 'react';

const Button = ({ type, style, onClick, title }) => {
  return (
    <button
      type={type || 'button'}
      style={style || {}}
      onClick={onClick}
    >
      { title || 'title' }
    </button>
  );
};

export default memo(Button);
