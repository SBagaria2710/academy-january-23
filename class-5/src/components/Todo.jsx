import React, { Component } from "react";

class TodoList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: [],
      newTodo: "",
    };

    console.log("Constructor: Setting up initial state");
  }

  componentDidMount() {
    console.log("Component Did Mount: Fetching initial to-do items");
    // Simulating fetching data from an API
    setTimeout(() => {
      this.setState({
        todos: ["Learn React", "Read a book"],
      });
    }, 1000);
  }

  componentDidUpdate(prevProps, prevState) {
    console.log("Componet Did Update: Checking if new to-do was added");
    if (prevState.todos !== this.state.todos) {
      console.log("Updated Todos: ", this.state.todos);
    }
  }

  componentWillUnmount() {
    console.log("Component Will Unmount: Cleaning up resources.");
  }

  handleInputChange = (event) => {
    this.setState({ newTodo: event.target.value });
  };

  handleAddTodo = () => {
    this.setState({
      todos: [...this.state.todos, this.state.newTodo], // Add newTodo along with the already existing todos
      newTodo: "", // Reseting the newTodo
    });
  };

  render() {
    console.log("Render: Rendering the to-do list");
    return (
      <div>
        <h1>To-Do List</h1>
        <ul>
          {this.state.todos.map((todo, index) => {
            return <li key={index}>{todo}</li>;
          })}
        </ul>
        <input
          type="text"
          value={this.state.newTodo}
          onChange={this.handleInputChange}
        />
        <button onClick={this.handleAddTodo}>Add To-Do</button>
      </div>
    );
  }
}

export default TodoList;
