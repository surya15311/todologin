import React, { useState } from "react";
import "./LoginForm.css";
import { FaUser, FaLock } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import Validation from "../LoginValidation";
import axios from "axios";

const LoginForm = ({ onLogin }) => {
  const [values, setValues] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const handleInput = (event) => {
    setValues((prev) => ({
      ...prev,
      [event.target.name]: [event.target.value],
    }));
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    setErrors(Validation(values));
    if(errors.email === "" && errors.password === "") {
      axios.post('http://localhost:8081/login',values)
      .then(res => {
        console.log(res)
        if (res.status === 200) {
            if (res.data === "Success") {
                onLogin(); // Trigger the onLogin prop
                navigate('/todolist');
            } else {
                alert("No record existed");
            }
        } else if (res.status === 401) {
            alert("Unauthorized: Invalid email or password");
        } else {
            alert("Internal Server Error");
        }
    })    
      .catch(err => console.log(err));
    }
  };
  return (
    <div className="wrapper">
      <h1>Login</h1>
      <form action="" onSubmit={handleSubmit}>
        <div className="input-box">
          <input
            type="email"
            placeholder="Enter Email"
            name="email"
            onChange={handleInput}
            required
          />
          <FaUser className="icon" />
          {errors.email && <span className="text-danger"> {errors.email}</span>}
        </div>
        <div className="input-box">
          <input
            type="password"
            placeholder="Password"
            name="password"
            onChange={handleInput}
            required
          />
          <FaLock className="icon" />
          {errors.password && 
            <span className="text-danger"> {errors.password}</span>
          }
        </div>
        <div className="remember-forgot">
          <label>
            <input type="checkbox" />
            Remember me
          </label>
          <a href="">Forgot password?</a>
        </div>
        <button type="submit">Login</button>
        <div className="register-link">
          <p>
            Don't have an account? <Link to="/signup">Register</Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
