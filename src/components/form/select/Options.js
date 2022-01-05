import React, { useContext } from 'react';
import SelectOptionsContext from './SelectOptionsContext';

const { SelectContext } = SelectOptionsContext;

const Options = () => {
  const props = useContext(SelectContext);
  const { selectValue, selectList, changeSelectValue } = props;
  return(
    <ul className={`select-options ${props.showList ? 'show' : 'hide'}-dropdown-options`}>
      {
        selectList.length > 0 && selectList.map((list,listIndex) => {
          return <li 
            key={listIndex} 
            className={`select-option ${selectValue === list.value && 'selected-text-checked'}`} 
            onClick={() => changeSelectValue(list.value)}
          >
            {list.label}
          </li>
        })
      }
    </ul>
  )
}

export default Options;