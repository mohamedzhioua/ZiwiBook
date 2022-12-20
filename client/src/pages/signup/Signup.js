import React, { useState } from "react";
import "./Signup.css";
import { Link } from "react-router-dom";
import CustomInput from "../../components/CustomInput/CustomInput";

function Register() {
  const [form, setForm] = useState({});
  const [error, setError] = useState({
    name: "name required",
    email: "format email required",
  });

  const onChangeHandler = (event) => {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  };
  console.log(form);
  return (
    <div class="container">
      <div class="login-card">
        <div class="d-flex justify-content-center">
          <h1>Create an account</h1>
        </div>
        <div class="form">
          <CustomInput
            type="text"
            name="name"
            label="Name"
            onChange={onChangeHandler}
            error={error.name}
            placeholder="name"
          />
        </div>
        <div class="form">
          <CustomInput
            type="text"
            name="email"
            label="Email"
            onChange={onChangeHandler}
            error={error.email}
            placeholder="name"
          />
        </div>
        <div class="form">
          <CustomInput
            type="password"
            name="password"
            label="Password"
            onChange={onChangeHandler}
            error={error.password}
            placeholder="name"
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
              <u>Login here</u>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;
