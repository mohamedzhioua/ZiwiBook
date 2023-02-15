import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

// features
import { register, reset } from "../../app/features/auth/authSlice";

// Components
import { CustomButton, CustomInput, Loading } from "../../components";

// Styles
import { FaUser } from "react-icons/fa";
import "./index.css";
import DateSelector from "./DateSelector";
function RegisterForm() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    passwordConfirm: "",
    gender: "",
    birthYear: new Date().getFullYear(),
    birthMonth: new Date().getMonth() + 1,
    birthDay: new Date().getDay(),
  });
  const {firstName ,lastName,email,password,passwordConfirm,gender,birthYear,birthMonth,birthDay}=form
  // eye show hide handler
  const [passwordVisible, setPasswordVisible] = useState(password);
  const Eye = () => {
    setPasswordVisible(!passwordVisible);
  };

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { error, status } = useSelector((state) => state.auth);
  const [dateError, setDateError] = useState(null);

  const [errors, setErrors] = useState(null);
  useEffect(() => {
    if (status === "fulfilled") {
      navigate("/login");
      dispatch(reset());
      setErrors(null);
    }
  }, [error, status, dispatch, navigate]);

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
    let current_date = new Date();

    const picked_date = new Date(
      birthYear,
     birthMonth - 1,
     birthDay
    );

    let atleast14 = new Date(1970 + 14, 0, 1);
    let noMoreThan70 = new Date(1970 + 70, 0, 1);
    if (current_date - picked_date < atleast14) {
      setDateError(
        "it looks like you(ve enetered the wrong info.Please make sure that you use your real date of birth."
      );
    } else if (current_date - picked_date > noMoreThan70) {
      setDateError(
        "it looks like you've enetered the wrong info.Please make sure that you use your real date of birth."
      );
    } else {
      setDateError(null);
      dispatch(register(form));
    }
  
  };

  if (status === "Loading") {
    return <Loading />;
  }

  return (
    <div class="signup-container">
      <div class="signup-card">
        <div class="signup-header">
          <span className="signup-header-title" >
            <FaUser /> Create an account
          </span>
          <span className="signup-header-title1">it's quick and easy</span>
        </div>
        <form onSubmit={onsubmitHandler} className="signup-form">
          <div className="LINE">
            <CustomInput
              type="text"
              name="firstName"
              label="firstName"
              onChange={onChangeHandler}
              error={error?.firstName}
              placeholder="firstName"
              value={firstName}
              float // to make the label floating
            />

            <CustomInput
              type="text"
              name="lastName"
              label="lastName"
              onChange={onChangeHandler}
              error={error?.lastName}
              placeholder="lastName"
              value={lastName}
              float // to make the label floating
            />
          </div>
            <CustomInput
              type="text"
              name="email"
              label="Email"
              onChange={onChangeHandler}
              error={error?.email}
              placeholder="email"
              value={email}
              float // to make the label floating
            />
         
            <CustomInput
              name="password"
              label="Password"
              onChange={onChangeHandler}
              error={error?.password}
              placeholder="password"
              value={password}
              float // to make the label floating
              type={passwordVisible ? "text" : "password"}
              onClick={Eye}
            />
         
            <CustomInput
              name="passwordConfirm"
              label="passwordConfirm"
              onChange={onChangeHandler}
              error={error?.passwordConfirm}
              placeholder="passwordConfirm"
              value={passwordConfirm}
              float // to make the label floating
              type={passwordVisible ? "text" : "password"}
              onClick={Eye}
            />
               <DateSelector
                    birthDay={birthDay}
                    birthMonth={birthMonth}
                    birthYear={birthYear}
                    dateError={dateError}
                    handleChange={onChangeHandler}
                  />

          <CustomButton className="button" type="submit" value="register" />
        </form>
        <div className="register">
          <p>
            Have already an account?{" "}
            <Link to="/" className="fw-bold text-body">
              <u className="Link" onClick={clean}>
                Login here
              </u>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default RegisterForm;
