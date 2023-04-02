const validator = require("validator");
const isEmpty = require("./IsEmpty");

module.exports = function SignupValidation(data) {
  let regex = /(?=(.*[0-9]))((?=.*[A-Za-z0-9])(?=.*[A-Z])(?=.*[a-z]))^.{8,}$/i;
  let errors = {};
  // Convert empty fields to an empty string so we can use validator
  data.firstName = !isEmpty(data.firstName) ? data.firstName : "";
  data.lastName = !isEmpty(data.lastName) ? data.lastName : "";
  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";
  data.passwordConfirm = !isEmpty(data.passwordConfirm) ? data.passwordConfirm : "";
  data.gender = !isEmpty(data.gender) ? data.gender : "";
  data.birthYear = !isEmpty(data.birthYear) ? data.birthYear : "";
  data.birthMonth = !isEmpty(data.birthMonth) ? data.birthMonth : "";
  data.birthDay = !isEmpty(data.birthDay) ? data.birthDay : "";

  // firstName checks
  if (validator.isEmpty(data.firstName)) {
    errors.firstName = "firstName field is required";
  }
  // lastName checks
  if (validator.isEmpty(data.lastName)) {
    errors.lastName = "lastName field is required";
  }
  // gender checks
  if (validator.isEmpty(data.gender)) {
    errors.gender = "gender field is required";
  }

  // Email checks
  if (validator.isEmpty(data.email)) {
    errors.email = "Email field is required";
  } else if (!validator.isEmail(data.email)) {
    errors.email = "Format Email required";
  }

  // Password checks
  if (validator.isEmpty(data.password)) {
    errors.password = "Password field is required";
  } else if (!regex.test(data.password)) {
    errors.password =
      "Password should have 1 lowercase letter, 1 uppercase letter, 1 number, and be at least 8 characters long";
  }

  if (!validator.equals(data.password, data.passwordConfirm)) {
    errors.passwordConfirm = "Passwords not matches";
  }

  if (validator.isEmpty(data.passwordConfirm)) {
    errors.passwordConfirm = "Required passwordConfirm";
  }
  return {
    errors,
    isValid: isEmpty(errors),
  };
};
