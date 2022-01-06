import React, { memo, useContext, useEffect, useRef } from "react";
import SelectOptionsContext from "./SelectOptionsContext";
import Options from "./Options";
import useOnClickOutside from '../../../helper/useOnClickOutside';

const { SelectContext } = SelectOptionsContext;
const Body = ({ 
  label = "Please Set Label ..", 
  sublabel = '',
  id = 'set Id here...',
  name = 'set Name here...',
  disable = false, 
  required = false, 
  placeholder = "Choose an option",
  value = "", 
  options = [],
  type = "select",
  validation = { isError: true, isTouched: true, message: 'handle validation here...' },
  onChangeNotFormElement = () => console.warn("handle onChange Event Here..."),
  onSelect = () => console.warn("handle onSelect Event Here..."),
  onBlur = () => console.warn("handle onBlur Event Here..."),
}) => {
  const selectListRef = useRef(null);
  const props = useContext(SelectContext);
  const { showList, changeSelectList, changeShowList } = props;

  useEffect(() => {
    console.log('changeSelectList')
    changeSelectList(options);
  },[ changeSelectList, options]);

  useOnClickOutside(selectListRef, () => changeShowList(false));
  const showError = validation?.isError && validation?.isTouched;
  const errorMessage = validation?.message || "";
  const isPlaceholder = value.length === 0
  return (
    <div style={{ display: "flex", flexDirection: "column", marginBottom: 25 }}>
      <div className={'label-group'}>
        <label className={required ? "label-required" : null} htmlFor={type}>{label}</label>
        {
          sublabel.length > 0 && (
            <span className={'sublabel'}>{sublabel}</span>
          )
        }
      </div>
      <div 
        ref={selectListRef} 
        className={`select-container ${disable ? 'select-is-disabled' : ''} ${showError ? 'select-error-validation' : ''} ${showList ? 'select-is-active' : ''} `}
      >
        <div className={`selected-text ${isPlaceholder && 'select-placeholder'}`} onClick={() => !disable && changeShowList(!showList)}>
          {isPlaceholder ? placeholder : value}
        </div>
        { !disable && <Options id={id} name={name} onBlur={onBlur} onSelect={onSelect} value={value} onChange={onChangeNotFormElement}/> }
        {
          showError && (
            <div className="error-validation" style={{ position: 'absolute' }}>
              { errorMessage }
            </div>
          )
        }
      </div>
      
    </div>
  );
};

const compare = (prevProps, nextProps) => {
  return JSON.stringify(prevProps) === JSON.stringify(nextProps);
};

export default memo(Body, compare);
