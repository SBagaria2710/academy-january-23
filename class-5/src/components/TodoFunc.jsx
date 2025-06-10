import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Todo = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");

  const handleInputChange = (event) => {
    setNewTodo(event.target.value);
  };

  const handleAddTodo = () => {
    setTodos((prevTodos) => [...prevTodos, newTodo]);
    setNewTodo("");
  };

  useEffect(() => {
    console.log("Component Did Mount: Fetching initial to-do items");

    // Simulate fetching data from an API
    setTimeout(() => {
      setTodos(["Learn React", "Complete LLD2 & LLD3 assignments"]);
    }, 1000);

    return () => {
      console.log("Component Will Unmount: Cleaning up resources");
    };
  }, []);

  useEffect(() => {
    console.log("Component Did Update: Checking if new todo was added");
    console.log("Updated To-Dos:", todos);
  }, [todos]);

  return (
    <div>
      <h1>To-Do List</h1>
      <ul>
        {todos.map((todo, index) => (
          <li key={index}>{todo}</li>
        ))}
      </ul>
      <input type="text" value={newTodo} onChange={handleInputChange} />
      <button onClick={handleAddTodo}>Add To-Do</button>
      <Link to="/">Home</Link>
    </div>
  );
};

export default Todo;
