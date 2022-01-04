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
  validation : { isError, isTouched, message },
  onBlur,
  onKeyUp
}) => {
  const [ showPS, setShowPS ] = useState(false);
  const showError = isError && isTouched;
  const errorMessage = message || "";
  console.log("---> TextField Render", label, showError)
  
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
          className={ showError ? 'error-validation' : null}
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
        showError && (
          <div className="error-validation" style={{ position: 'absolute', bottom: '-20px'}}>{ errorMessage }</div>
        )
      }
    </div>
  );
};

const compare = ( prevProps, nextProps ) => {
  return JSON.stringify(prevProps) === JSON.stringify(nextProps)
}

export default memo(TextField,compare);
