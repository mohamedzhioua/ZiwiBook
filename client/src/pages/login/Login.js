import React from "react";
import CustomInput from "../../components/CustomInput/CustomInput";
import "./Login.css";
import { Link } from "react-router-dom";
import { FaSignInAlt } from "react-icons/fa";
function Login() {
  return (
    <div class="container">
      <div class="signup-card">
        <div class="d-flex justify-content-center">
          <h1>
            <FaSignInAlt /> Sing In
          </h1>
        </div>
        <CustomInput
          type="text"
          name="email"
          label="Email"
          // onChange={onChangeHandler}
          // error={error.name}
          placeholder="Email"
        />

        <CustomInput
          type="text"
          name="password"
          label="password"
          // onChange={onChangeHandler}
          // error={error.name}
          placeholder="password"
        />

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
              <u className="link"> Register</u>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
