import * as Yup from "yup";

export const signupValidation = Yup.object({
  firstName: Yup.string()
    .required("What's your first name?")
    .max(100)
    .min(2)
    .matches(/^([a-zA-Z]+\s)*[a-zA-Z]+$/, "You can use english charcters only"),
  lastName: Yup.string()
    .required("What's your last name?")
    .max(100)
    .min(2)
    .matches(/^([a-zA-Z]+\s)*[a-zA-Z]+$/, "You can use english charcters only"),
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

export const loginValidation = Yup.object({
  email: Yup.string()
    .required("Email address is required.")
    .email("Must be a valid email.")
    .max(100),
  password: Yup.string().required("Password is required").min(8),
});
