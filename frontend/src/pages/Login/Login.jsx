import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosBaseUrl from "../../utils/axios";
import "./Login.css";

const Login = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axiosBaseUrl.post("/login", form);

      if (response.data.success) {
        const token = response.data.token;

        navigate("/home");
      }
    } catch (error) {
      console.error("There was an error!", error);
    }
  };

  return (
    <div className="body">
      <h1 className="logo">GALLERY</h1>
      {/* <img src="/logo.svg" alt="" /> */}
      <div className="login-section">
        <h1 className="header">Log In</h1>
        <form className="login-form" id="loginForm" onSubmit={handleSubmit}>
          <div className="login-input">
            <label htmlFor="email">Email</label>
            <input
              className="input"
              type="text"
              id="email"
              name="email"
              onChange={(e) => {
                setForm({
                  ...form,
                  email: e.target.value,
                });
              }}
            />
          </div>

          <div className="login-input">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              className="input"
              onChange={(e) => {
                setForm({
                  ...form,
                  password: e.target.value,
                });
              }}
            />
          </div>

          <input type="submit" value="Log In" className="primary-btn" />
        </form>
        <a href="./signup">
          <button className="secondary-btn">Sign Up</button>
        </a>
      </div>
    </div>
  );
};

export default Login;
