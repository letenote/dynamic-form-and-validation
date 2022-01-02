import React, { useState, memo } from 'react';

const TextField = ({
  label,
  id,
  name,
  placeholder,
  type,
  value,
  onChange,
  disable,
  addStyle,
  required,
  validation,
  onBlur,
  onKeyUp
}) => {
  const [ showPS, setShowPS ] = useState(false);
  return (
    <div
      style={
        Object.assign({}, 
          addStyle || null, 
          {
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
            position: 'relative',
            marginBottom: '25px'
          }
        )
      }
    >
      <label 
        className={required ? "label-required" : null} 
        htmlFor={type}
      >
        {label}
      </label>
      <div style={{ position: 'relative' }}>
        <input
          className={validation && validation.isTouched && validation.isError ? 'error-validation' : null}
          value={value}
          disabled={disable}
          onChange={onChange}
          onBlur={onBlur}
          onKeyUp={onKeyUp}
          id={id}
          name={name}
          placeholder={placeholder}
          type={
            type === 'password'
              ? showPS 
                ? 'text' : 'password'
              : type
          }
        />
        {
          type === 'password' && (
            <span className="btn-show" onClick={() => setShowPS(!showPS)}>
            icon
            </span>
          )
        }
      </div>
      {
        validation && validation.isTouched && validation.isError && (
          <div className="error-validation" style={{ position: 'absolute', bottom: '-20px'}}>{validation.message}</div>
        )
      }
    </div>
  );
};

export default memo(TextField);
