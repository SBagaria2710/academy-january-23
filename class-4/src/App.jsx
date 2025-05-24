import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css'
import Counter from "./components/Counter";
import CounterRedux from "./components/CounterRedux";
import TodoRedux from "./components/TodoRedux";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/counter" element={<Counter />} />
        <Route path="/counter-redux" element={<CounterRedux />} />
        <Route path="/todo-redux" element={<TodoRedux />} />
        <Route path="*" element={<div>Try different route.</div>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App
