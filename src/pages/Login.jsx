import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";

const Login = () => {
  const navigate = useNavigate();

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const handleInputChange = (e) => {
    console.log(e.target.value);
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value,
    });
    setErrors({
      ...errors,
      [e.target.name]: "",
    });
  };
  // useEffect(()=>{
  //   console.log(formData)
  // },[formData])
  const validate = () => {
    const newErrors = {};
    if (!loginData.email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(loginData.email)) {
      newErrors.email = "Invalid Email format.";
    }
    if (!loginData.password.trim()) {
      newErrors.password = "Password is required.";
    } else if (loginData.password.length < 6) {
      newErrors.password = "Minimum 6 character required";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const handleClick = (e) => {
    e.preventDefault();
    if (validate()) {
      const user = JSON.parse(localStorage.getItem("authData"));
      if (
        user &&
        loginData.email === user.email &&
        loginData.password === user.password
      ) {
        localStorage.setItem("loginData", JSON.stringify(loginData));
        navigate("/dashboard");
      }
    } else {
      alert("something went wrong");
    }
  };
  return (
    <div className="form-container">
      <h1 className="form-title">Welcome Back</h1>

      <form onSubmit={handleClick}>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            value={loginData.email}
            onChange={handleInputChange}
            placeholder="Enter your email"
          />
          {errors.email && <span className="error-msg">{errors.email}</span>}
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={loginData.password}
            onChange={handleInputChange}
            placeholder="Enter your password"
          />
          {errors.email && <span className="error-msg">{errors.password}</span>}
        </div>
        <button type="submit" className="btn-primary">
          Login
        </button>
      </form>

      <p className="link-text">
        Don't have an account? <Link to="/register">Register here</Link>
      </p>
    </div>
  );
};

export default Login;
