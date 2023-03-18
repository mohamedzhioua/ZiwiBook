import React from "react";
import "./index.css";
import  CloseEye from "../../../svg/closeEye.svg";
import  OpenEye  from ".././../../svg/openEye.svg"
const CustomInput = ({
  onFocus,
  onBlur,
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
            ref={innerRef}
          />
        ) : (
          <input
          onFocus={onFocus}
          onBlur={onBlur}
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
          <span>
            {type === "password" ? (
              <img src={CloseEye} alt="CloseEye"  onClick={onClick} className="Icon" />
            ) : (
              <img src={OpenEye} alt="OpenEye"  onClick={onClick} className="Icon" />
            )}
          </span>
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
