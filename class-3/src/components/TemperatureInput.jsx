import { useState } from "react";

function TemperatureInput({ temp, handleTemp }) {
  return (
    <div>
      <label htmlFor="temp">Temp:</label>
      <input
        type="number"
        id="temp"
        value={temp}
        onChange={(event) => handleTemp(event.target.value)}
      ></input>
    </div>
  );
}

export default TemperatureInput;
