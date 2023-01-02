const validator = require("validator");
const isEmpty = require("./IsEmpty");

module.exports = function PostValidation(data) {
  let errors = {};
  data.title = !isEmpty(data.title) ? data.title : "";
  data.body = !isEmpty(data.body) ? data.body : "";

  if (validator.isEmpty(data.title)) {
    errors.title = "Required title";
  }

  if (validator.isEmpty(data.body)) {
    errors.body = "Required blog content";
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};
