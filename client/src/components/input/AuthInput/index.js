import React, { useState } from "react";
import { useField, ErrorMessage } from "formik";
// Components
import { Popper } from "../../index";
// Styles
import styles from "./style.module.css";
import { MdOutlineErrorOutline } from "react-icons/md";
import { useMediaQuery } from "react-responsive";
import { FaRegEye , FaRegEyeSlash } from "react-icons/fa";

function AuthInput({ placeholder, dir, type, disabled ,password,onClick, ...props }) {
  const [trigger, setTrigger] = useState(null);
  const [field, meta] = useField(props);
  const [show, setShow] = useState(false);
  
  const desktopView = useMediaQuery({
    query: "(min-width: 850px)",
  });
  return (
    <>
    <div className={styles.authInput_container} ref={setTrigger}>
      {meta.touched && meta.error && show && (
        <Popper
          trigger={trigger}
          placement={desktopView ? dir || "left" : "top-start"}
          offsetNum={desktopView ? 15 : 8}
        >
          <ErrorMessage  name={field.name} />
        </Popper>
      )}
      <input
        className={meta.touched && meta.error ? styles.ERROR : ""}
        type={type}
        name={field.name}
        placeholder={placeholder}
        disabled={disabled}
        autoComplete="on"
        {...field}
        onFocusCapture={() => setShow(true)}
        onBlurCapture={(e) => {
          setShow(false);
        }}
      />
       <span className={styles.showHidePassword}  onClick={onClick}  
>
{(field.name === "password" )|| (field.name === "passwordConfirm") ? (
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
     </span>
      {meta.touched && meta.error && (
        <MdOutlineErrorOutline
          className={styles.ER}
        />
      )}
    </div>
    
     </>
  );
}

export default AuthInput;
