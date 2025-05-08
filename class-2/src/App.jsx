import './App.css'
// import ConditionalRendering from './components/ConditionalRendering';
// import MyComponent from './components/MyComponent'
// import DisplayData from "./components/DisplayData";
import Button from './components/Button';

function App() {
  // const fruits = ["Apple", "Banana", "Cherry"];
  // const person = {
  //   name: "Alice",
  //   age: 25
  // };
  return (
    <div>
      {/* <MyComponent name={"Component 1"} /> */}
      {/* <DisplayData fruits={fruits} person={person} /> */}
      {/* <ConditionalRendering isLoggedIn={false} userName={"Shashwat"} /> */}
      <Button />
    </div>
  );
}

export default App
