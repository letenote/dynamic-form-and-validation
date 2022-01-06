import React, { useContext, memo } from 'react';
import SelectOptionsContext from './SelectOptionsContext';

const { SelectContext } = SelectOptionsContext;

const Options = ({ id, name, onBlur, onSelect, value, onChange }) => {
  const props = useContext(SelectContext);
  const { selectList, changeShowList } = props;
  return(
    <ul className={`select-options ${props.showList ? 'show' : 'hide'}-dropdown-options`}>
      {
        selectList.length > 0 && selectList.map((list,listIndex) => {
          return <li 
            key={listIndex} 
            id={id}
            name={name}
            value={list.value}
            className={`select-option ${value === list.value && 'selected-text-checked'}`} 
            onClick={(e) => {
              onChange(list.value)
              onSelect(e)
              changeShowList(false)
            }}
          >
            {list.label}
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