import React  from "react";
import classnames from "classnames";
import "./CustomInput.css";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
const CustomInput = ({
  name,
  label,
  type,
  onChange,
  error,
  placeholder,
  value,
  defaultValue,
   accept,
  float,
  onClick
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
            defaultValue={defaultValue}
           />
        ) : (
          <input
            type={type}
            name={name}
            onChange={onChange}
            className={classnames("form-control", { "is-invalid": error })}
            placeholder={placeholder}
            value={value}
            defaultValue={defaultValue}
            accept={accept}
           />
        )}
        {name === "password" ? (
          <>
            {type === "password" ? (
              <FaRegEyeSlash
                onClick={onClick}
                className="Icon"
              />
            ) : (
              <FaRegEye 
              onClick={onClick}
            className="Icon"
              />
            )}
          </>
        ) : (
          ""
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
