import React, { useState, useEffect } from "react";
import { Form, Input, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Layout from "../components/Layout/Layout";
import Spinner from "../components/Spinner";


const Login = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const submitHandler = async (values) => {
    try {
      setLoading(true);
      const { data } = await axios.post("/users/login", values);
      localStorage.setItem(
        "user",
        JSON.stringify({ ...data.user, password: "" })
      );
        setLoading(false);
        
        navigate("/");
        message.success("Login Successfully");
    } catch (error) {
        console.log(error);
      setLoading(false);
      message.error("Please Enter Valid Login credentials");
    }
  };

  useEffect(() => {
    if (localStorage.getItem("user")) {
      navigate("/");
    }
  }, [navigate]);
  return (
    <Layout>
      <>
        {loading ? (
          <Spinner />
        ) : (
          <div className="register-page">
            <div className="img">
              <img
                className="img-1"
                height={"300px"}
                src={
                  "https://camo.githubusercontent.com/8bf6f6d78abc81fcf9c49f10649423e73ea44bc248e83aaae8759d401c829a84/68747470733a2f2f70687973696373677572756b756c2e66696c65732e776f726470726573732e636f6d2f323031392f30322f6368617261637465722d312e676966"
                }
                alt="loading..."
              />
            </div>

            <Form layout="vertical" onFinish={submitHandler}>
              <h1>Login Form</h1>
              <Form.Item label="Email" name="email" required>
                <Input type="email" required />
              </Form.Item>
              <Form.Item label="Password" name="password" required>
                <Input type="password" required />
              </Form.Item>
              <button className="btn btn-primary p-1">Login</button>
              <Link to="/forgot-password" className="m-4 anchor">
                Forgot Password
              </Link>
              <div className="d-flex justify-content-between mt-2">
                <Link className="anchor" to="/register">
                  <h6>Not a User ? Click here to register</h6>
                </Link>
              </div>
            </Form>
          </div>
        )}
      </>
    </Layout>
  );
};

export default Login;
