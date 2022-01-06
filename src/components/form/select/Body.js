import React, { memo, useContext, useEffect, useRef } from "react";
import SelectOptionsContext from "./SelectOptionsContext";
import Options from "./Options";
import useOnClickOutside from '../../../helper/useOnClickOutside';

const { SelectContext } = SelectOptionsContext;
const Body = ({ 
  label = "Please Set Label ..", 
  disable = false, 
  required = false, 
  placeholder = "Choose an option",
  value = "", 
  options = [],
  validation = { isError: true, isTouched: true, message: 'handle validation here...' },
}) => {
  const selectListRef = useRef(null);
  const props = useContext(SelectContext);
  const { showList, selectValue, changeSelectValue, changeSelectList, changeShowList } = props;
  console.log("-> Body", props);
  useEffect(() => {
    changeSelectList(options);
    value !== "" && changeSelectValue(value);
  }, []);

  useOnClickOutside(selectListRef, () => changeShowList(false));
  const showError = validation?.isError && validation?.isTouched;
  const errorMessage = validation?.message || "";
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <label className={required ? "label-required" : null}>{label}</label>
      <div 
        ref={selectListRef} 
        className={`select-container ${disable ? 'select-is-disable' : ''} ${showError ? 'select-error-validation' : ''} ${showList ? 'select-is-active' : ''} `}
      >
        <div className={"selected-text"} onClick={() => !showList ? changeShowList(true) : null}>
          {selectValue.length === 0 ? placeholder : selectValue}
        </div>
        { !disable && <Options/> }
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
