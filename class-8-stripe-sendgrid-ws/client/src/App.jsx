import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

import { Button } from "antd";
import StripeCheckout from "react-stripe-checkout";
import axios from "axios";

function StripeIntegration() {
  const onToken = async (token) => {
    console.log("Received Token:", token);
    try {
      const response = await axios.post("http://localhost:8082/api/make-payment", {
        token,
        amount: 5000
      });

      if (response.data.success) {
        alert(`Payment Successfull! Transaction ID: ${response.data.transactionId}`);
      } else {
        alert("Payment Failed!", response.data.message);
      }
    } catch(err) {
      alert("Payment error:", err.message);
    }
  };

  return (
    <div className="container">
      <StripeCheckout
        stripeKey="USE STRIPE PUBLISHABLE KEY"
        token={onToken}
        billingAddress
        amount={5000}
      >
        <Button type="primary" shape="round" size="large">
          Pay Now
        </Button>
      </StripeCheckout>
    </div>
  );
}

function App() {
  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>1</button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
      <StripeIntegration />
    </>
  );
}

export default App;
