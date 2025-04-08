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
      // Fetch IP-based geolocation data
      const locationRes = await fetch("https://ipapi.co/json");
      const locationData = await locationRes.json();

      // Add latitude and longitude to the form data
      const loginData = {
        ...form,
        latitude: locationData.latitude,
        longitude: locationData.longitude,
      };

      const response = await axiosBaseUrl.post("/login", loginData);

      if (response.data.success) {
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
        <button
          className="secondary-btn"
          onClick={() => {
            navigate("/signup");
          }}
        >
          Sign Up
        </button>
      </div>
    </div>
  );
};

export default Login;
