import React from "react";
import CustomInput from "../../components/CustomInput/CustomInput";
import "./Login.css";
import { Link } from "react-router-dom";
function Login() {
  return (
    <div class="container">
      <div class="signup-card">
        <div class="d-flex justify-content-center">
          <h1>Sing In</h1>
        </div>
        <div class="form">
          <CustomInput
            type="text"
            name="name"
            label="Name"
            // onChange={onChangeHandler}
            // error={error.name}
            placeholder="name"
          />
        </div>
        <div class="form">
          <CustomInput
            type="text"
            name="name"
            label="Name"
            // onChange={onChangeHandler}
            // error={error.name}
            placeholder="name"
          />
        </div>

        <button
          type="button"
          class="btn btn-primary btn-lg btn-block mb-4 Login"
        >
          Sign in
        </button>

        <div class="text-center">
          <p>
            Not a member?
            <Link to="/signup" class="fw-bold text-body">
              <u> Register</u>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
