import React, { useState, createContext } from 'react';

const SelectOptionsContext = () => {
  const SelectContext = createContext();
  const SelectProvider = (props) => {
    const [ showList, setShowList ] = useState(false);
    const [ selectList, setSelectList ] = useState([]);
    const changeShowList = (v) => setShowList(v);
    const changeSelectList = (list) => setSelectList(list);
    const selectState = {
      selectList,
      changeSelectList,
      showList,
      changeShowList,
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

