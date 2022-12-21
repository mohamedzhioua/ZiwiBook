import React, { useState } from "react";
import "./Signup.css";
import { Link } from "react-router-dom";
import CustomInput from "../../components/CustomInput/CustomInput";

function Register() {
  const [form, setForm] = useState({});
  const [error, setError] = useState({});

  const onChangeHandler = (event) => {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  };
  
  return (
    <div class="container">
      <div class="login-card">
        <div class="d-flex justify-content-center">
          <h1>Create an account</h1>
        </div>
        <div class="form">
          <CustomInput
            type="text"
            name="firstname"
            label="firstname"
            onChange={onChangeHandler}
            error={error.firstname}
            placeholder="firstname"
          />
        </div>
        <div class="form">
          <CustomInput
            type="text"
            name="lastname"
            label="lastname"
            onChange={onChangeHandler}
            error={error.lastname}
            placeholder="lastname"
          />
        </div>
        <div class="form">
          <CustomInput
            type="text"
            name="email"
            label="Email"
            onChange={onChangeHandler}
            error={error.email}
            placeholder="email"
          />
        </div>
        <div class="form">
          <CustomInput
            type="password"
            name="password"
            label="Password"
            onChange={onChangeHandler}
            error={error.password}
            placeholder="password"
          />
        </div>

        <button
          type="button"
          class="btn btn-primary btn-lg btn-block mb-4 Signup"
        >
          Sign up
        </button>
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
