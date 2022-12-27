import React from "react";
import classnames from "classnames";
import "./CustomInput.css";

const CustomInput = ({
  name,
  label,
  type,
  onChange,
  error,
  placeholder,
  value,
  float,
}) => {
  return (
    <div className={!float ? "form-group mb-2" : "form-group mb-4"}>
      <div className={float && "form-floating"}>
        {!float && <label className="form-label">{label}</label>}
        {type === "textarea" ? (
          <textarea
            name={name}
            onChange={onChange}
            className={classnames("form-control", { "is-invalid": error })}
            placeholder={placeholder}
            value={value}
          />
        ) : (
          <input
            type={type}
            name={name}
            onChange={onChange}
            className={classnames("form-control", { "is-invalid": error })}
            placeholder={placeholder}
            value={value}
          />
        )}

        {float && <label>{label}</label>}
        {error && (
          <div className={!float ? "invalid-feedback" : "invalid-tooltip"}>
            {error}
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomInput;
