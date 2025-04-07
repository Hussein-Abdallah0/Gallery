import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import "./Signup.css";
import axiosBaseUrl from "../../utils/axios";

const Signup = () => {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axiosBaseUrl.post("/register", form);

      if (response.data.success) {
        // const token = response.data.token;
        // localStorage.setItem("token", token);

        navigate("/home");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="body">
      <h1 className="logo">GALLERY</h1>
      <div className="signup-section">
        <h1 className="header">Sign Up</h1>
        <form className="login-form" id="signupForm" onSubmit={handleSubmit}>
          <div className="login-input">
            <label htmlFor="name">Full Name</label>
            <input
              className="input"
              type="text"
              id="username"
              name="username"
              onChange={(e) => {
                setForm({
                  ...form,
                  username: e.target.value,
                });
              }}
            />
          </div>

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
              className="input"
              type="password"
              id="password"
              name="password"
              onChange={(e) => {
                setForm({
                  ...form,
                  password: e.target.value,
                });
              }}
            />
          </div>

          <input className="primary-btn" type="submit" value="Sign Up" />
        </form>
        <button
          className="secondary-btn"
          onClick={() => {
            navigate("/");
          }}
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default Signup;
