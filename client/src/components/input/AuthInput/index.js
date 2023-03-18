import React, { useState } from "react";
import { useField, ErrorMessage } from "formik";
import { Popper } from "../../index";
import styles from "./style.module.css";
import ErrorSVG from "../../../svg/Error.svg";
import { useMediaQuery } from "react-responsive";
import  CloseEye from "../../../svg/closeEye.svg";
import  OpenEye  from ".././../../svg/openEye.svg"

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
               <img src={CloseEye} alt="CloseEye"     onClick={onClick}/>
          
            ) : (
              <img src={OpenEye} alt="OpenEye"     onClick={onClick}/>

            )}
          </>
        ) : (
          ""
        )}
     </span>
      {meta.touched && meta.error && (
       <img src={ErrorSVG} alt="ErrorSVG" className={styles.ER}/>
      )}
    </div>
    
     </>
  );
}

export default AuthInput;
