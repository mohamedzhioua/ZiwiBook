import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

// features
import { login, reset } from "../../app/features/auth/authSlice";

// Components
import { CustomButton, CustomInput, Loading } from "../../components";

// Styles
import { FaSignInAlt } from "react-icons/fa";
import "./index.css";

const LoginForm = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const { email, password } = form;

  // eye show hide handler
  const [passwordVisible, setPasswordVisible] = useState(password);
  const Eye = () => {
    setPasswordVisible(!passwordVisible);
  };

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { error, token, status } = useSelector((state) => state.auth);

  useEffect(() => {
    if (status === "fulfilled" || token) {
      navigate("/");
    }
  }, [error, token, navigate, status, dispatch]);

  // clean Form from Errors
  const clean = () => {
    dispatch(reset());
  };
  //onChangeHandler
  const onChangeHandler = (event) => {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  };

  //onsubmitHandler
  const onsubmitHandler = (event) => {
    event.preventDefault();
    dispatch(login(form));
  };

  if (status === "Loading") {
    return <Loading />;
  }

  return (
    <div class="login-container">
      <div className="login-head">
            <span className="login-span">
          ZIWIbook helps you connect and share with the people in your life.
        </span>
        </div>
      <div class="login-card">
        <div class="d-flex justify-content-center">
          <h1>
            <FaSignInAlt /> Sing In
          </h1>
        </div>
        <form onSubmit={onsubmitHandler} className="login-form">
          <CustomInput
            type="text"
            name="email"
            label="Email"
            onChange={onChangeHandler}
            error={error?.email}
            placeholder="Email"
            value={email}
            float // secret key to make the label floating
          />

          <CustomInput
            name="password"
            label="password"
            onChange={onChangeHandler}
            error={error?.password}
            placeholder="password"
            value={password}
            float // secret key to make the label floating
            type={passwordVisible ? "text" : "password"}
            onClick={Eye}
          />
          <CustomButton className="button" type="submit" value="submit" />
        </form>
        <div class="login">
          <p>
            Not a member?
            <Link to="/signup" class="fw-bold text-body"  >
              <u className="Link" onClick={clean}>
                 Register
              </u>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
