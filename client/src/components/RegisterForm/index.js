import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Formik, Form } from "formik";
import * as Yup from "yup";

// features
import { register, reset } from "../../app/features/auth/authSlice";

// Components
import { CustomButton, AuthInput, FormLoader } from "../../components";

// Styles
import "./index.css";

import { FaUser } from "react-icons/fa";
import DateSelector from "./DateSelector";
import GenderSelector from "./GenderSelector";
function RegisterForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const form = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    passwordConfirm: "",
    gender: "",
    birthYear: (new Date().getFullYear()),
    birthMonth: new Date().getMonth() + 1,
    birthDay: new Date().getDay(),
  };
  const { error, status } = useSelector((state) => state.auth);
  const [dateError, setDateError] = useState(null);
  const [genderError, setGenderError] = useState(true);

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
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [passwordConfirmVisible, setPasswordConfirmVisible] = useState(false);
    const Eye = () => {
    setPasswordVisible(!passwordVisible);
  };
  const Eye2 = () => {
    setPasswordConfirmVisible(!passwordConfirmVisible)
  };

  useEffect(() => {
    if (status === "fulfilled") {
      // navigate("/login");
      // dispatch(reset());
    }
  }, [error, status, dispatch, navigate]);

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
      .min(8)
      .matches(
        /(?=(.*[0-9]))((?=.*[A-Za-z0-9])(?=.*[A-Z])(?=.*[a-z]))^.{8,}$/i,
        "Password should have at least 1 lowercase letter, 1 uppercase letter, 1 number, and be at least 8 characters long"
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
    dispatch(register(values))
      .unwrap()
      .then((data) => {
        navigate("/login");
      dispatch(reset());
      })
      .catch((error) => {
        console.log(error);
      });
  };

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
          enableReinitialize={false}
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
          onSubmit={async (values, { setFieldError }) => {
            let currentDate = new Date();

            const picked_date = new Date(
              values.birthYear,
              values.birthMonth - 1,
              values.birthDay
            );

            let atleast14 = new Date(1970 + 14, 0, 1);
            let noMoreThan70 = new Date(1970 + 70, 0, 1);
            if (currentDate - picked_date < atleast14) {
              setDateError(
                "it looks like you've enetered the wrong info.Please make sure that you use your real date of birth."
              );
            } else if (currentDate - picked_date > noMoreThan70) {
              setDateError(
                "it looks like you've enetered the wrong info.Please make sure that you use your real date of birth."
              );
            } else {
              setPasswordVisible(values.password)
              setDateError(null);
              setGenderError(null);
              onsubmitHandler(values);
              Boolean(error) && setFieldError("email", error.email);

            }
          }}
        >
          {(formik) => {
    
            return (
              <Form className="signup-form" noValidate>
                <FormLoader loading={status}>
                  <div className="LINE">
                    <AuthInput
                      type="text"
                      name="firstName"
                      placeholder="first name"
                    />

                    <AuthInput
                      dir="right"
                      type="text"
                      name="lastName"
                      placeholder="last name"
                    />
                  </div>
                  <AuthInput
                    type="email"
                    name="email"
                    placeholder="Email address"
                  />

                  <AuthInput
                    name="password"
                    placeholder="password"
                    type={passwordVisible ? "text" : "password"}
                    onClick={Eye}
                   />

                  <AuthInput
                    name="passwordConfirm"
                    placeholder="password confirm"
                    type={passwordConfirmVisible ? "text" : "password"}
                    onClick={Eye2}
                  />
                  <DateSelector
                    birthDay={birthDay}
                    birthMonth={birthMonth}
                    birthYear={birthYear}
                    dateError={dateError}
                  />
                  <GenderSelector
                    genderError={genderError}

                  />
                </FormLoader>
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
              <u className="Link">Login here</u>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default RegisterForm;
