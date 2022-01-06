import React, { useEffect, useMemo, useState, createContext } from 'react';
import sleep from '../../../helper/sleep';

const AutocompleteContext = () => {
  const AutocompleteFormContext = createContext();
  const AutocompleteFormProvider = (props) => {
    const [ value, setValue ] = useState("");
    // const [isDebounced, setIsDebounced] = useState(false);
    const [ isLoading, setIsLoading ] = useState(false);
    const [ fullfilledStatus, setFullfilledStatus ] = useState(false);
    const [ suggestions, setSuggestions ] = useState([]);
    // const setLoadingHandler = (v) => setLoading(v);
    const setSuggestionsHandler = (list) => setSuggestions(list);
    const getData = async (userInput) => {
      setFullfilledStatus(false)
      setIsLoading(true)
      console.log(userInput,"<<< CONTEX")
      await sleep(1000)
      setSuggestions([
        { name: "asdasdasd" },
        { name: "bdasdsdfasd" },
        { name: "csdasdasd" },
        { name: "ddasdsdfasd" }
      ])
      setIsLoading(false)
      setFullfilledStatus(true)
    }

    const resetValueHandler = () => {
      setFullfilledStatus(false)
      setSuggestions([])
    }

    // const debouncedChangeHandler = useDebounce((userInput) => console.log(userInput), 1300)

    // useEffect(() => {
    //   // return () => {
    //   //   debouncedChangeHandler.cancel();
    //   // };
    // }, [debouncedChangeHandler]);

    const setValueHandler = (event) => {
      // const userInput = event.target.value;
      // debouncedChangeHandler(userInput);
      // setIsDebounced(true);
    }
    // const debouncedValue = useMemo(() => useDebounce(() => {
    //   setLoadingHandler(true)
    // }, 5000),[])

    // useEffect(() => {
    //   // do search stuff
    //   console.log("debounce 1")
    //   // setLoadingHandler(true)
    // }, [debouncedValue]);

    const selectState = {
      isLoading, setIsLoading,
      getData,
      fullfilledStatus,
      resetValueHandler,
      suggestions,
      setSuggestionsHandler
    }

    return (
      <AutocompleteFormContext.Provider value={selectState}>
        {props.children}
      </AutocompleteFormContext.Provider>
    )
  };

  return {
    AutocompleteFormContext,
    AutocompleteFormProvider
  }
}

// function useDebounce(value, wait = 500) {
//   const [debounceValue, setDebounceValue] = useState(value);

//   useEffect(() => {
//     const timer = setTimeout(() => {
//       setDebounceValue(value);
//     }, wait);
//     return () => clearTimeout(timer); // cleanup when unmounted
//   }, [value, wait]);

//   return debounceValue;
// }

export default AutocompleteContext();

