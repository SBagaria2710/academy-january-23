import React from "react";
import { Button, Form, Input, message } from "antd";
import { Link } from "react-router-dom";

function Login() {
  const [messageApi, contextHolder] = message.useMessage();

  const onFinish = (values) => {
    console.log("Called", values);
    messageApi.open({
      type: "success",
      content: "This looks fine. Logging in this user...",
    });
  };

  return (
    <div>
      {contextHolder}
      <header className="App-header">
        <main className="main-area mw-500 text-center px-3">
          <section className="left-section">
            <h1>Login to BMS</h1>
          </section>

          <section className="right-section">
            <Form layout="vertical" onFinish={onFinish}>
              <Form.Item
                label="Email"
                htmlFor="email"
                name={"email"}
                className="d-block"
                rules={[
                  { required: true, message: "Email is required" },
                  { type: "email", message: "Please, enter a valid email" },
                ]}
              >
                <Input type="email" placeholder="Enter your email"></Input>
              </Form.Item>

              <Form.Item
                label="Password"
                htmlFor="password"
                name={"password"}
                className="d-block"
                rules={[{ required: true, message: "Password is required" }]}
              >
                <Input
                  type="password"
                  placeholder="Enter your password"
                ></Input>
              </Form.Item>

              <Form.Item className="d-block">
                <Button
                  type="primary"
                  block
                  htmlType="submit"
                  style={{ fontSize: "1rem", fontWeight: "600" }}
                >
                  Login
                </Button>
              </Form.Item>
            </Form>

            <div>
              <p>
                New User? <Link to="/register">Register Here</Link>
              </p>
              <p>
                Forgot Password? <Link to="/forget">Click Here</Link>
              </p>
            </div>
          </section>
        </main>
      </header>
    </div>
  );
}

export default Login;
