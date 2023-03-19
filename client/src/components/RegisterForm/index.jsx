import * as React from "react";
import { Link } from "react-router-dom";
import { Formik, Form } from "formik";
import { CustomButton, AuthInput, FormLoader, Card } from "..";
import classes from "./register.module.css";
import IconStyle from "../../styles/icons.module.css";
import userSVG from "../../assets/svg/user.svg";
import DateSelector from "./DateSelector";
import GenderSelector from "./GenderSelector";
import { useRegisterMutation } from "../../app/features/auth/authApi";
import { signupValidation } from "../../utils/YupValidation";

function RegisterForm({ setShowRegister, showRegister }) {
  const registerRef = React.useRef();
  const [register, { isLoading, isSuccess, error, isError }] = useRegisterMutation();
  React.useEffect(() => {
    if (isSuccess) {
      setShowRegister(false);
    }
  }, [isSuccess]);

  const form = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    passwordConfirm: "",
    gender: "",
    birthYear: new Date().getFullYear(),
    birthMonth: new Date().getMonth() + 1,
    birthDay: new Date().getDay(),
  };
  const [dateError, setDateError] = React.useState(null);
  const [genderError, setGenderError] = React.useState(true);

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
  const [passwordVisible, setPasswordVisible] = React.useState(false);
  const [passwordConfirmVisible, setPasswordConfirmVisible] = React.useState(false);
  const Eye = () => {
    setPasswordVisible(!passwordVisible);
  };
  const Eye2 = () => {
    setPasswordConfirmVisible(!passwordConfirmVisible);
  };

  return (
    <div className="blur">
      <Card className={classes.signup_card} innerRef={registerRef}>
        <div className={classes.signup_header}>
          <i
            className={IconStyle.exit_icon}
            onClick={() => setShowRegister(false)}
          ></i>

          <span className={classes.signup_header_title}>
            <img src={userSVG} alt="user_icon" /> Create an account
          </span>
          <span className={classes.signup_header_title1}>
            it's quick and easy
          </span>
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
              setPasswordVisible(values.password);
              setDateError(null);
              setGenderError(null);
              register(values).unwrap();
              setFieldError("email", error.data.email);
            }
          }}
        >
          {(formik) => {
            return (
              <Form className={classes.signup_form} noValidate>
                <FormLoader loading={isLoading}>
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
                  <GenderSelector genderError={genderError} />
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

        <div className={classes.register}>
          <p>
            Have already an account?
            <Link to="/" className={classes.login_link}>
              &nbsp;Login here
            </Link>
          </p>
        </div>
      </Card>
    </div>
  );
}

export default RegisterForm;
