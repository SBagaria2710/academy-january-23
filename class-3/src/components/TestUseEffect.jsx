import { useState, useEffect } from "react";

const INITIAL_VALUE = 0;

function TestUseEffect() {
  const [count, setCount] = useState(INITIAL_VALUE);

  const handleIncrement = () => {
    const newCount = count + 1;
    setCount(newCount);
  };

  const handleDecrement = () => {
    if (count === 0) return;
    const newCount = count - 1;
    setCount(newCount);
  };

  const handleReset = () => {
    setCount(INITIAL_VALUE);
  };

  // useEffect gets invoked everytime this component re-render
  useEffect(function () {
    // This will be called when the component mounts
    console.log("Mounted");
  }, [count]);
  /**
   * 1. [] - Will be called only during mounting phase
   * 2. ["some values here"] - Will be called during mounting phase and when any of the mentioned variables change.
   * 3. Will be called during mounting as well as anytime the component re-renders
   */

  return (
    <div>
      <h2>The count value is {count}</h2>
      <button onClick={handleIncrement}>Increment</button>
      <button onClick={handleDecrement}>Decrement</button>
      <button onClick={handleReset}>Reset</button>
    </div>
  );
}

export default TestUseEffect;
