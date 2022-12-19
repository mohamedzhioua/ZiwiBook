import React from "react";
import classnames from "classnames";

function CustomInput({ name, label, type, onChange, error, placeholder }) {
  return (
  <div class="form-floating mb-4">
      <input
        type={type} 
        name={name}
        onChange={onChange}
        className={classnames("form-control", { "is-invalid": error })}
        placeholder={placeholder}
      />
      <label>{label}</label>
      {error && <div class="invalid-feedback">{error}</div>}{" "}
    </div>
    );
}

export default CustomInput;
