import React, { useContext, memo } from 'react';
import AutocompleteContext from "./AutocompleteContext";

const { AutocompleteFormContext } = AutocompleteContext;

const Options = ({ onSelect }) => {
  const props = useContext(AutocompleteFormContext);
  const { suggestions, fullfilledStatus } = props;
  return(
    <ul className={`select-options ${fullfilledStatus ? 'show' : 'hide'}-dropdown-options`}>
      {
        suggestions.map((list,listIndex) => {
          return <li 
            key={listIndex} 
            // id={id}
            // name={name}
            // value={list.value}
            className={`select-option`} 
            onClick={(e) => {
              onSelect(list.name)
            }}
          >
            {list.name}
          </li>
        })
      }
    </ul>
  )
}

const compare = (prevProps, nextProps) => {
  return JSON.stringify(prevProps) === JSON.stringify(nextProps);
};

export default memo(Options,compare);