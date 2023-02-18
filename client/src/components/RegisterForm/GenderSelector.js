import React, { useState } from "react";
import { useMediaQuery } from "react-responsive";
import "./index.css";
import { Field, ErrorMessage, useField } from "formik";
import {Popper} from "../index";
import { MdOutlineErrorOutline } from "react-icons/md";

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
    <div className="colHeader">
      Gender 
      {genderError &&
       <MdOutlineErrorOutline
         className="err_icon"
       />}
    </div>
    <div className="select-grid gender">
      <label htmlFor="male"   className={genderError ? "ERROR" : ""}>
        Male
        <Field
          type="radio"
          name="gender"
          id="male"
          value="male"
        />
      </label>
      <label htmlFor="female"   className={genderError ? "ERROR" : ""}>
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
