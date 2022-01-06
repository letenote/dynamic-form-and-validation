import React from 'react';

const Spiner = () => {
  const size = {
    small : {
      "width": "14px",
      "height": "14px",
      "borderWidth": "3px",
    }
  }
  return <div style={size['small']} className="loader"/>
}

export default Spiner;