import React from 'react'

function Button() {
  const handleClick = () => {
    console.log("Clicked");
  };

  return <button onClick={handleClick}>Button</button>;
}

export default Button