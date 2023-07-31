import React, { useState, useEffect } from "react";
import { Form, Input, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Layout from "../components/Layout/Layout";
import Spinner from "../components/Spinner";

const Register = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const submitHandler = async (values) => {
    try {
      setLoading(true);
      await axios.post("/users/register", values);
      message.success("Registered Successfully");
      setLoading(false);
      navigate("/login");
    } catch (error) {
      setLoading(false);
      message.error("Invalid Email or Password ");
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
          <div className="register-page ">
            <Form layout="vertical" onFinish={submitHandler}>
              <h1>Register Form</h1>
              <Form.Item label="Name" name="name" required>
                <Input type="name" required />
              </Form.Item>
              <Form.Item label="Email" name="email" required>
                <Input type="email" required />
              </Form.Item>
              <Form.Item label="Create Password" name="password" required>
                <Input type="password" required />
              </Form.Item>
              <button className="btn btn-primary p-1 ">Register</button>
              <div className="d-flex justify-content-between mt-2">
                <Link className="anchor" to="/login">
                  Already Registerd ? Cleck Here to login
                </Link>
              </div>
            </Form>
          </div>
        )}
      </>
    </Layout>
  );
};

export default Register;
