import React, { useState } from "react";
import { useAuthForm } from "../../hooks/useAuthForm";
import "./Login.css";

const Login = () => {
  const { form, isSubmitting, error, handleChange, handleSubmit } = useAuthForm("login");

  return (
    <div className="body">
      <h1 className="logo">GALLERY</h1>
      <div className="login-section">
        <h1 className="header">Log In</h1>
        {error && <div className="error-message">{error}</div>}
        <form className="login-form" onSubmit={handleSubmit}>
          <div className="login-input">
            <label htmlFor="email">Email</label>
            <input
              className="input"
              type="email"
              id="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="login-input">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              className="input"
              value={form.password}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="primary-btn" disabled={isSubmitting}>
            {isSubmitting ? "Logging in..." : "Log In"}
          </button>
        </form>
        <button className="secondary-btn" onClick={() => navigate("/signup")}>
          Sign Up
        </button>
      </div>
    </div>
  );
};

export default Login;
