import { useState } from "react";

function TemperatureDisplay({ temp }) {
  const f = temp * (9 / 5) + 32;
  return (
    <div>
      <p>F: {f}</p>
      <p>C: {temp}</p>
    </div>
  );
}

export default TemperatureDisplay;
