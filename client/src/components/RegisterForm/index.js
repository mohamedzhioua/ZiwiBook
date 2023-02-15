import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Formik, Form } from "formik";
import * as Yup from "yup";

// features
import { register, reset } from "../../app/features/auth/authSlice";

// Components
import { CustomButton, AuthInput, Loading } from "../../components";

// Styles
import "./index.css";

import { FaUser } from "react-icons/fa";
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
  const {
    firstName,
    lastName,
    email,
    password,
    passwordConfirm,
    gender,
    birthYear,
    birthMonth,
    birthDay,
  } = form;

  // eye show hide handler
  const [passwordVisible, setPasswordVisible] = useState(password);
  const Eye = () => {
    setPasswordVisible(!passwordVisible);
  };

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { error, status } = useSelector((state) => state.auth);
  const [errors, setErrors] = useState(null);
  console.log("🚀 ~ file: index.js:53 ~ RegisterForm ~ errors", errors);
  const [dateError, setDateError] = useState(null);

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
  const signupValidation = Yup.object({
    firstName: Yup.string()
      .required("What's your first name?")
      .max(100)
      .min(2)
      .matches(
        /^([a-zA-Z]+\s)*[a-zA-Z]+$/,
        "You can use english charcters only"
      ),
    lastName: Yup.string()
      .required("What's your last name?")
      .max(100)
      .min(2)
      .matches(
        /^([a-zA-Z]+\s)*[a-zA-Z]+$/,
        "You can use english charcters only"
      ),
    email: Yup.string()
      .required(
        "You'll need this when you log in and if you ever need to reset your password."
      )
      .email("Must be a valid email.")
      .max(100),
    password: Yup.string()
      .required("Password is required")
      .min(6)
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#_$%^&*])(?=.{6,})/,
        "Password must contain at least one lowercase letter, one uppercase letter, one number, and one special character"
      ),
    passwordConfirm: Yup.string().test(
      "passwords-match",
      "Password confirm must match password !",
      function (value) {
        return this.parent.password === value;
      }
    ),
    gender: Yup.string().required("Gender is required"),
  });

  //onsubmitHandler
  const onsubmitHandler = (values) => {
    dispatch(register(values));
  };

  if (status === "Loading") {
    return <Loading />;
  }

  return (
    <div class="signup-container">
      <div class="signup-card">
        <div class="signup-header">
          <span className="signup-header-title">
            <FaUser /> Create an account
          </span>
          <span className="signup-header-title1">it's quick and easy</span>
        </div>
        <Formik
          enableReinitialize
          validationSchema={signupValidation}
          initialValues={{
            firstName,
            lastName,
            email,
            password,
            passwordConfirm,
            birthYear,
            birthMonth,
            birthDay,
            gender,
          }}
          onSubmit={(values) => {
            let currentDate = new Date();
            console.log(
              "🚀 ~ file: index.js:215 ~ RegisterForm ~ values",
              values
            );

            const picked_date = new Date(
              values.birthYear,
              values.birthMonth - 1,
              values.birthDay
            );

            let atleast14 = new Date(1970 + 14, 0, 1);
            let noMoreThan70 = new Date(1970 + 70, 0, 1);
            if (currentDate - picked_date < atleast14) {
              setDateError(
                "it looks like you(ve enetered the wrong info.Please make sure that you use your real date of birth."
              );
            } else if (currentDate - picked_date > noMoreThan70) {
              setDateError(
                "it looks like you've enetered the wrong info.Please make sure that you use your real date of birth."
              );
            } else {
              setDateError(null);
              onsubmitHandler(values);
            }
          }}
        >
          {(formik) => {
            return (
              <Form className="signup-form">
                <div className="LINE">
                  <AuthInput
                    type="text"
                    name="firstName"
                    placeholder="firstName"
                  />

                  <AuthInput
                    dir="right"
                    type="text"
                    name="lastName"
                    placeholder="lastName"
                  />
                </div>
                <AuthInput 
                type="text" 
                name="email"
                 label="Email" 
                 />

                <AuthInput
                  name="password"
                  label="Password"
                  placeholder="password"
                />

                <AuthInput
                  name="passwordConfirm"
                  label="passwordConfirm"
                  placeholder="passwordConfirm"
                />
                <DateSelector
                  birthDay={birthDay}
                  birthMonth={birthMonth}
                  birthYear={birthYear}
                  dateError={dateError}
                />

                <CustomButton
                  className="button"
                  type="submit"
                  value="register"
                />
              </Form>
            );
          }}
        </Formik>

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
