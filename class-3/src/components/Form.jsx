import React, { useState } from "react";

function Form() {
  // Initializing the state for form inputs
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    // Here, you can handle the collected data
    console.log(`Name: ${name}, Email: ${email}`);

    // Optionally, reset the form after submission
    setName("");
    setEmail("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      <div>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <button type="submit">Submit</button>
    </form>
  );
};

export default Form;