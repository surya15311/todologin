import React, {useState} from "react";
import { FaLock, FaUser } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import Validation from "./SignupValidation";
import axios from 'axios'

const Signup = () => {
  const [values, setValues] = useState({
    name: "",
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
    if(errors.name === "" && errors.email === "" && errors.password === "") {
      axios.post('http://localhost:8081/signup',values)
      .then(res => {
        navigate('/');
      })
      .catch(err => console.log(err));
    }
  };
  return (
    <div className="wrapper">
      <h1>Signup</h1>
      <form action="" onSubmit={handleSubmit}>
        <div className="input-box">
          <input type="text" placeholder="Username" name="name" onChange={handleInput} required />
          <FaUser className="icon" />
          {errors.name && 
            <span className="text-danger"> {errors.name}</span>
          }
        </div>
        <div className="input-box">
          <input type="email" placeholder="Enter Email" name="email" onChange={handleInput} required />
          <FaUser className="icon" />
          {errors.email && 
            <span className="text-danger"> {errors.email}</span>
          }
        </div>
        <div className="input-box">
          <input type="password" placeholder="Password" name="password" onChange={handleInput} required />
          <FaLock className="icon" />
          {errors.password && 
            <span className="text-danger"> {errors.password}</span>
          }
        </div>
        <button type="submit">Sign up</button>
        <div className="register-link">
          <p>
            You are agree to our terms and policies?
            <Link to="/">
              <br />
              Login
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};


export default Signup;
