import React, { memo, useContext, useEffect } from "react";
import SelectOptionsContext from "./SelectOptionsContext";
import Options from "./Options";

const { SelectContext } = SelectOptionsContext;

const Body = ({ 
  label = "Please Set Label ..", 
  disable = false, 
  required = false, 
  value = "", 
  options = [],
  validation = { isError: true, isTouched: true, message: 'handle validation here...' },
}) => {
  const props = useContext(SelectContext);
  const { selectValue, changeSelectValue, changeSelectList, changeShowList } = props;
  console.log("-> Body", props);
  useEffect(() => {
    changeSelectList(options);
    value !== "" && changeSelectValue(value);
  }, []);

  const showError = validation?.isError && validation?.isTouched;
  const errorMessage = validation?.message || "";
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <label className={required ? "label-required" : null}>{label}</label>
      <div 
      className={`${disable ? 'select-container-disable' : 'select-container'} ${showError && 'select-error-validation'}`}
        // className={
        //   disable 
        //     ? "select-container-disable" 
        //     : showError
        //       ? "select-container-error-validation"
        //       : "select-container"
        // }
      >
        <div className={"selected-text"} onClick={changeShowList}>
          {selectValue}
        </div>
        { !disable && <Options /> }
        {
          showError && (
            <div className="error-validation" style={{ position: 'absolute' }}>{ errorMessage }</div>
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
