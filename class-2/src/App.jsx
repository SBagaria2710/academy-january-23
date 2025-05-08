import './App.css'
// import MyComponent from './components/MyComponent'
import DisplayData from "./components/DisplayData";

function App() {
  const fruits = ["Apple", "Banana", "Cherry"];
  const person = {
    name: "Alice",
    age: 25
  };
  return (
    <div>
      {/* <MyComponent name="Component 1" /> */}
      <DisplayData fruits={fruits} person={person} />
    </div>
  );
}

export default App
