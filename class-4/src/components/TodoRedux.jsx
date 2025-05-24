import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { setValue, addTask } from "../slices/todoSlice";

function TodoRedux() {
  const { value, todoList } = useSelector((store) => {
    return store.todoState;
  });

  const dispatch = useDispatch();

  const handleChange = (e) => {
    const updatedValue = e.target.value;
    dispatch(setValue(updatedValue));
  };

  const handleAddTask = () => {
    if (value == "") return;
    dispatch(addTask());
  };

  return (
    <div style={{ gap: "10px" }}>
      <h2>Todo</h2>
      <div style={{ display: "flex" }}>
        <div className="inputBox">
          <input type="text" value={value} onChange={handleChange} />
          <button onClick={handleAddTask}>Add Task</button>
        </div>
        <div className="list">
          <ul>
            {todoList.map((task, idx) => {
              return <li key={idx}>{task}</li>;
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default TodoRedux;
