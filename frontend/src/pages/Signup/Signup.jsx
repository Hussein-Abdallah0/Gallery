import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuthForm } from "../../hooks/useAuthForm";
import "./Signup.css";

const Signup = () => {
  const navigate = useNavigate();
  const { form, isSubmitting, error, handleChange, handleSubmit } = useAuthForm("signup");

  const onSignupSuccess = () => {
    navigate("/home");
  };
  return (
    <div className="body">
      <h1 className="logo">GALLERY</h1>
      <div className="signup-section">
        <h1 className="header">Sign Up</h1>
        {error && <div className="error-message">{error}</div>}
        <form className="login-form" onSubmit={(e) => handleSubmit(e, onSignupSuccess)}>
          <div className="login-input">
            <label htmlFor="username">Full Name</label>
            <input
              className="input"
              type="text"
              id="username"
              name="username"
              value={form.username}
              onChange={handleChange}
              required
            />
          </div>

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
              className="input"
              type="password"
              id="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="primary-btn" disabled={isSubmitting}>
            {isSubmitting ? "Creating account..." : "Sign Up"}
          </button>
        </form>
        <button className="secondary-btn" onClick={() => navigate("/")}>
          Login
        </button>
      </div>
    </div>
  );
};

export default Signup;
