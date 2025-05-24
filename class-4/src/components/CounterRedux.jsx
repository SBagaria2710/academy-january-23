import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { decrement, increment } from "../slices/counterSlice";

function CounterRedux() {
  const count = useSelector((store) => store.counterState.count);
  const dispatch = useDispatch();

  const handleIncrement = () => {
    dispatch(increment());
  };

  const handleDecrement = () => {
    dispatch(decrement());
  };

  return (
    <div style={{ display: "flex", gap: "10px" }}>
      <button onClick={handleIncrement}> + </button>
      <h3>{count}</h3>
      <button onClick={handleDecrement}> - </button>
    </div>
  );
}

export default CounterRedux;
