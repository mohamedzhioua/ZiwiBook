import React, { useState } from "react";
import "./Signup.css";
import { Link } from "react-router-dom";
import CustomInput from "../../components/CustomInput/CustomInput";
import { FaUser } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { register } from "../../app/features/auth/authSlice";

function Register() {
  const [form, setForm] = useState({});
  // const [error, setError] = useState({});
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { error } = useSelector((state) => state.auth);
  console.log('errrrrr',error);
console.log(form);
  const onChangeHandler = (event) => {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  };
  const onsubmitHandler = (event) => {
    event.preventDefault();
    dispatch(register(form));
 
  };
  return (
    <div class="container">
      <div class="login-card">
      <form onSubmit={onsubmitHandler} >
        <div class="d-flex justify-content-center">
          <h1>
            <FaUser /> Create an account
          </h1>
        </div>
     
          <CustomInput
            type="text"
            name="firstname"
            label="firstname"
            onChange={onChangeHandler}
            error={error.firstname}
            placeholder="firstname"
          />

          <CustomInput
            type="text"
            name="lastname"
            label="lastname"
            onChange={onChangeHandler}
            error={error.lastname}
            placeholder="lastname"
          />

          <CustomInput
            type="text"
            name="email"
            label="Email"
            onChange={onChangeHandler}
            error={error.email}
            placeholder="email"
          />

          <CustomInput
            type="password"
            name="password"
            label="Password"
            onChange={onChangeHandler}
            error={error.password}
            placeholder="password"
          />

          <button
            type="submit"
            class="btn btn-primary btn-lg btn-block mb-4 Signup"
          >
            Sign up
          </button>
        </form>
        <div class="text-center">
          <p>
            Have already an account?{" "}
            <Link to="/login" class="fw-bold text-body">
              <u className="link">Login here</u>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;
