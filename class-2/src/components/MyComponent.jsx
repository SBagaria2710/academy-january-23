import React from 'react';

const MyComponent = (props) => {
  const { name } = props;
  return <h1>Hello, I am {name}</h1>;
};

export default MyComponent;