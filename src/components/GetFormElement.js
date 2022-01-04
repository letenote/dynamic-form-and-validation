import React, { memo } from 'react';
import TextField from './form/TextField';

const GetFormElement = ( props ) => {
  const { type } = props;
  console.log("--> GetFormElement Render", props.label);

  switch( type ){
    case "text":
    case "email":
    case "password":
      return <TextField {...props}/>
    default:
      return null
  }
};

const compare = ( prevProps, nextProps ) => {
  return JSON.stringify(prevProps) === JSON.stringify(nextProps)
}

export default memo(GetFormElement, compare);