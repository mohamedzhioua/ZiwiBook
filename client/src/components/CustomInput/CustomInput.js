import React from "react";
import classnames from "classnames";
import "./CustomInput.css";

function CustomInput({ name, label, type, onChange, error, placeholder ,value }) {
  return (
    <div class="form">
    <div class="form-floating mb-2">
      <input
        type={type}
        name={name}
        onChange={onChange}
        className={classnames("form-control", { "is-invalid": error })}
        placeholder={placeholder}
        value={value}
      />
      <label>{label}</label>
      {error && <div class="invalid-tooltip">{error}</div>}{" "}
    </div>
    </div>
  );
}

export default CustomInput;
