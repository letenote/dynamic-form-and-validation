import SelectOptionsContext from './SelectOptionsContext';
import Body from './Body';

const { SelectProvider } = SelectOptionsContext;

const Select = (props) => {
  return(
    <SelectProvider>
      <Body {...props}/>
    </SelectProvider>
  )
}

export default Select;