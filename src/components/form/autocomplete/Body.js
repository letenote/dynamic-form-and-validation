import React, { useContext, useEffect, useState, useMemo } from "react";
import Spiner from "../../Spiner";
import AutocompleteContext from "./AutocompleteContext";
import debounce from "lodash/debounce";
import Options from './Options';

const { AutocompleteFormContext } = AutocompleteContext;
const Body = ({
  label = "Please set Label here...",
  required = true,
  value="",
  type = "text",
  placeholder = "Search an option",
  disable = false, 
  validation = { isError: true, isTouched: true, message: 'handle validation here...' },
}) => {
  const props = useContext(AutocompleteFormContext);
  const { isLoading, getData, fullfilledStatus, resetValueHandler } = props;
  const showError = validation?.isError && validation?.isTouched;
  const errorMessage = validation?.message || "";
  const [ selectedValue, setSelectedValue ] = useState(value);

  const debouncedChangeHandler = useMemo(
    () => debounce((userInput) => {
      getData(userInput)
    }, 1500),
    []
  );

  // Stop the invocation of the debounced function after unmounting
  useEffect(() => {
    return () => {
      debouncedChangeHandler.cancel();
    };
  }, [debouncedChangeHandler]);

  const handleUserInputChange = (event) => {
    const userInput = event.target.value;
    setSelectedValue(userInput)
    debouncedChangeHandler(userInput);
  }

  const handleUserSelectChange = ( v ) => {
    setSelectedValue(v)
    resetValueHandler()
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        position: "relative",
        marginBottom: "25px",
      }}
    >
      <label className={required ? "label-required" : null} htmlFor={"text"}>
        {label}
      </label>
      <div 
        className={`autocomplete-container`}
      >
        <input
          type="text"
          autoComplete="off"
          placeholder={placeholder}
          // onKeyDown={(e) => debounce(() => console.log("keydown", e), 1000)}
          onChange={handleUserInputChange}
          // onKeyDown={onKeyDown}
          value={selectedValue}
        />
        {
          isLoading && (
            <span className="icon-input-rigth-position">
              <Spiner/>
            </span>
          )
        }
        {
          fullfilledStatus && <Options onSelect={handleUserSelectChange}/>
        }
      </div>
    </div>
  );
};

export default Body;
