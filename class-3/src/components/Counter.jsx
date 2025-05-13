import React, { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);

  const decrementCount = () => {
    setCount(count - 1);
  };

  const incrementCount = () => {
    setCount(count + 1);
  };

  const printCurrentCountValue = () => {
    console.log(count);
  };

  return (
    <div>
      <h1>Counter App</h1>
      <p>Count: {count}</p>

      {/* Button to Increment */}
      <button onClick={incrementCount}>Increment</button>

      {/* Button to Decrement */}
      <button onClick={decrementCount}>Decrement</button>

      {/* Button to Print Count Value */}
      <button onClick={printCurrentCountValue}>Print Value</button>
    </div>
  );
}

export default Counter;