import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import { Formik, Form } from "formik";

// features
import { login} from "../../app/features/auth/authSlice";

// Components
import { AuthInput, CustomButton, FormLoader } from "../../components";

// Styles
import { FaSignInAlt } from "react-icons/fa";
import "./index.css";
import ZIWIBook from "../../icons/ZIWIBook.png"
const LoginForm = () => {
  const form = { email: "", password: "" };
  const { email, password } = form;

  // eye show hide handler
  const [passwordVisible, setPasswordVisible] = useState(false);
  const Eye = () => {
    setPasswordVisible(!passwordVisible);
  };

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { error,status } = useSelector((state) => state.auth);

  useEffect(() => {}, [error , navigate, status, dispatch]);


  const loginValidation = Yup.object({
    email: Yup.string()
      .required("Email address is required.")
      .email("Must be a valid email.")
      .max(100),
    password: Yup.string().required("Password is required").min(8),
  });

  return (
    <div class="login-container">
      <div className="login-head">
      <img src={ZIWIBook} alt=""  className="login-image"/>
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
        <Formik
          enableReinitialize={false}
          validationSchema={loginValidation}
          initialValues={{
            email,
            password,
          }}
          onSubmit={async (values, { setFieldError }) => {
            dispatch(login(values))
              .unwrap()
              .then((data) => {
                navigate("/");
              })
              .catch((error) => {
                setFieldError("email", error.email);
                setFieldError("password", error.password);
              });
          }}
        >
          {(formik) => {
            return (
              <Form className="login-form">
                <FormLoader loading={status}>
                  <AuthInput
                    type="text"
                    name="email"
                    placeholder="Email address"
                  />

                  <AuthInput
                    name="password"
                    placeholder="password"
                    type={passwordVisible ? "text" : "password"}
                    onClick={Eye}
                  />
                </FormLoader>
                <CustomButton className="button" type="submit" value="submit" />
              </Form>
            );
          }}
        </Formik>

        <div class="login">
          <p>
            Not a member?
            <Link to="/signup" class="signup-link">
            &nbsp;  Register
             </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
