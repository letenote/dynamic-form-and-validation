import React from 'react';
import TextField from './form/TextField';

const GetFormElement = ( props ) => {
  const { type } = props;
  switch( type ){
    case "text":
    case "email":
    case "password":
      return <TextField {...props}/>
    default:
      return null
  }
}

export default GetFormElement