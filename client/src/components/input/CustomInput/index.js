import React from "react";
import "./index.css";
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
  hidden,
  float,
  onClick,
  className,
  autoFocus,
  innerRef,
}) => {
  return (
    
      <div className={float && "form-floating"}>
        {!float && <label className="form-label">{label}</label>}
        {type === "textarea" ? (
          <textarea
            autoFocus={autoFocus}
            name={name}
            onChange={onChange}
            className={
              className
                ? className
                : error
                ? "form-control is-invalid"
                : "form-control"
            }
            placeholder={placeholder}
            value={value}
            defaultValue={defaultValue}
          />
        ) : (
          <input
            autoFocus={autoFocus}
            onClick={onClick}
            type={type}
            name={name}
            onChange={onChange}
            className={
              className
                ? className
                : error
                ? "form-control is-invalid"
                : "form-control"
            }
            placeholder={placeholder}
            value={value}
            defaultValue={defaultValue}
            accept={accept}
            hidden={hidden}
            ref={innerRef}
          />
        )}
        {name === "password" ? (
          <>
            {type === "password" ? (
              <FaRegEyeSlash onClick={onClick} className="Icon" />
            ) : (
              <FaRegEye onClick={onClick} className="Icon" />
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
    
  );
};

export default CustomInput;
