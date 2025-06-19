import React from "react";
import { Button, Form, Input, Radio, message } from "antd";
import { Link } from "react-router-dom";

function Login() {
  const [messageApi, contextHolder] = message.useMessage();

  const onFinish = (values) => {
    console.log("Called", values);
    messageApi.open({
      type: "error",
      content: "This looks fine. Registering this user...",
    });
  };

  return (
    <div>
      {contextHolder}
      <header className="App-header">
        <main className="main-area mw-500 text-center px-3">
          <section className="left-section">
            <h1>Register to BMS</h1>
          </section>

          <section className="right-section">
            <Form layout="vertical" onFinish={onFinish}>
              <Form.Item
                label="Name"
                htmlFor="name"
                name={"name"}
                className="d-block"
                rules={[{ required: true, message: "Name is required" }]}
              >
                <Input type="text" placeholder="Enter your name"></Input>
              </Form.Item>

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
                  Register
                </Button>
              </Form.Item>

              <Form.Item
                label="Register as a Partner"
                htmlFor="isPartner"
                name={"isPartner"}
                className="d-block text-center"
                initialValue={false}
              >
                <div style={{ display: "flex", justifyContent: "start" }}>
                  <Radio.Group name="radiogroup" className="flex-start">
                    <Radio value={true}>Yes</Radio>
                    <Radio value={false}>No</Radio>
                  </Radio.Group>
                </div>
              </Form.Item>
            </Form>

            <div>
              <p>
                Already a user? <Link to="/login">Login Here</Link>
              </p>
            </div>
          </section>
        </main>
      </header>
    </div>
  );
}

export default Login;
