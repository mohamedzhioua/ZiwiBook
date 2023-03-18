import React, { useState } from "react";
import { useMediaQuery } from "react-responsive";
import classes from "./register.module.css";
import { Field, ErrorMessage, useField } from "formik";
import {Popper} from "../index";
import ErrorSVG from "../../svg/Error.svg";

function GenderSelector() {
  const [trigger, setTrigger] = useState(null);
  const [show, setShow] = useState(false);
  const [field, meta] = useField({ name: "gender" });
  
  const genderError = meta.error;

  const desktopView = useMediaQuery({
    query: "(min-width: 850px)",
  });


  return (
    <div
    className="col"
    ref={setTrigger}
    onMouseEnter={() => setShow(true)}
    onMouseLeave={() => setShow(false)}
  >
    <div className={classes.colHeader}>
      Gender 
      {genderError &&
       <img src={ErrorSVG} alt="ErrorSVG"/>}
    </div>
    <div className={`${classes.select_grid} ${classes.gender}`}>
      <label htmlFor="male"   className={genderError ? `${classes.ERROR}` : ""}>
        Male
        <Field
          type="radio"
          name="gender"
          id="male"
          value="male"
        />
      </label>
      <label htmlFor="female"   className={genderError ? `${classes.ERROR}` : ""}>
        Female
        <Field
          type="radio"
          name="gender"
          id="female"
          value="female"
        />
      </label>
      {genderError && show && (
        <Popper
          trigger={trigger}
          placement={desktopView ? "left" : "top-start"}
          offsetNum={desktopView ? 15 : 8}
        >
          <ErrorMessage name="gender" />
        </Popper>
      )}
    </div>
  </div>
  );
}

export default GenderSelector;
