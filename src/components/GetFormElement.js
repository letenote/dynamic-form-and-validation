import React, { memo } from 'react';
import TextField from './form/TextField';
import Select from './form/select';

const GetFormElement = ( props ) => {
  const { type = 'text' } = props;
  console.log("--> GetFormElement Render", props.label, props.tabIndex ?? '-');

  switch( type ){
    case "text":
    case "email":
    case "password":
    case "date":
      return <TextField {...props}/>
    case "select":
    case "dropdown":
      return <Select {...props}/>
    default:
      return null
  }
};

const compare = ( prevProps, nextProps ) => {
  return JSON.stringify(prevProps) === JSON.stringify(nextProps)
}

export default memo(GetFormElement, compare);