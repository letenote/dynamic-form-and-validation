import React, { useState, createContext } from 'react';

const SelectOptionsContext = () => {
  const SelectContext = createContext();
  const SelectProvider = (props) => {
    const [ showList, setShowList ] = useState(false);
    const [ selectValue, setSelectValue ] = useState('');
    const [ selectList, setSelectList ] = useState([]);
    const changeShowList = (v) => setShowList(v);
    const changeSelectValue = (v) => (
      setSelectValue(v),
      setShowList(false)
    );
    const changeSelectList = (list) => setSelectList(list)
    const selectState = {
      selectList,
      changeSelectList,
      showList,
      changeShowList,
      selectValue,
      changeSelectValue
    }

    return (
      <SelectContext.Provider value={selectState}>
        {props.children}
      </SelectContext.Provider>
    )
  };

  return {
    SelectContext,
    SelectProvider
  }
}

export default SelectOptionsContext();

