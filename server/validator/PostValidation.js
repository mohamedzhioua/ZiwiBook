const validator = require("validator");
const isEmpty = require("./IsEmpty");

module.exports = function PostValidation(data) {
  let errors = {};
   data.text = !isEmpty(data.text) ? data.text : "";

  if (validator.isEmpty(data.text)) {
    errors.text = "Required post content";
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};
