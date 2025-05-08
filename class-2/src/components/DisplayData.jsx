import React from 'react'

function DisplayData({ fruits, person }) {
  return (
    <div>
      <h2>Fruit List:</h2>
      <ul>
        {fruits.map((fruit, index) => {
          return <li key={index}>{fruit}</li>
        })}
      </ul>
      <hr />
      <h2>Person Info:</h2>
      <p>Name: {person.name}</p>
      <p>Age: {person.age}</p>
    </div>
  );
}

export default DisplayData