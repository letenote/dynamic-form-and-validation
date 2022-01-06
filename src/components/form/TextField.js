import React, { useState, memo } from 'react';

const TextField = ({
  label = 'Please set Label here...',
  id = 'set Id here...',
  name = 'set Name here...',
  placeholder = 'set Placeholder here...',
  type = 'text',
  value = "",
  onChange = () => console.warn("handle onChange Event Here..."),
  disable = true,
  addStyle = null,
  required = true,
  validation = { isError: true, isTouched: true, message: 'handle validation here...' },
  onBlur = () => console.warn("handle onBlur Event Here..."),
  onKeyUp = () => console.warn("handle onKeyUp Event Here..."),
  tabIndex = "set TabIndex here...",
  onSelect = () => console.warn("handle onSelect Event Here...")
}) => {
  const [ showPS, setShowPS ] = useState(false);
  const showError = validation?.isError && validation?.isTouched;
  const errorMessage = validation?.message || "";
  const onSelectEventByType = ["date"]
  console.log("---> TextField Render", label, showError)
  
  return (
    <div
      style={
        Object.assign({}, 
          addStyle, 
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
          {...(onSelectEventByType.includes(type) ? { onSelect } : { onKeyUp })}
          {...(tabIndex !== '' && { tabIndex })}
          onKeyDown={(e) => {
            const invalidKey = ["Escape", "Enter" ];
            return invalidKey.includes(e.key) && console.warn("user press button", e.key);
          }}
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
            <span className="icon-input-rigth-position" style={{ cursor: "pointer" }} onClick={() => setShowPS(!showPS)}>
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
