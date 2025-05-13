import { useState } from 'react';
import './App.css'
// import Counter from './components/Counter'
// import Form from './components/Form'
// import TemperatureDisplay from './components/TemperatureDisplay';
// import TemperatureInput from './components/TemperatureInput';
import TestUseEffect from './components/TestUseEffect';

function App() {
  const [temp, setTemp] = useState("");
  const handleTemp = (newTemp) => {
    setTemp(newTemp);
  };
  return (
    // <Counter />
    // <Form />
    // <TemperatureInput temp={temp} handleTemp={handleTemp} />
    // <TemperatureDisplay temp={temp} />
    <TestUseEffect />
  );
}

export default App
