import AutocompleteContext from './AutocompleteContext';
import Body from './Body';

const { AutocompleteFormProvider } = AutocompleteContext;

const AutoComplete = (props) => {
  return(
    <AutocompleteFormProvider>
      <Body {...props}/>
    </AutocompleteFormProvider>
  )
}

export default AutoComplete;