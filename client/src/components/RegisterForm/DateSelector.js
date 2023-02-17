import React, { useState } from "react";
import { useMediaQuery } from "react-responsive";
import "./index.css";
import { Field } from "formik";
import {Popper} from "../index";
import { MdOutlineErrorOutline } from "react-icons/md";

function DateSelector({ birthDay, birthMonth, birthYear , dateError}) {
  const [trigger, setTrigger] = useState(null);
  const [show, setShow] = useState(false);

  const desktopView = useMediaQuery({
    query: "(min-width: 850px)",
  });
  const yearTemp = new Date().getFullYear();
  const years = Array.from(new Array(108), (val, index) => yearTemp - index);
  const months = Array.from(new Array(12), (val, index) => 1 + index);
  const getDays = () => {
    return new Date(birthYear, birthMonth, 0).getDate();
  };

  const days = Array.from(new Array(getDays()), (val, index) => 1 + index);

  return (
    <div
      className="col"
      ref={setTrigger}
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
    >
      <div className="colHeader">Birthday
      {dateError && 
         <MdOutlineErrorOutline
         className="err_icon"
       />}
       </div>
      <div className="select-grid">
        <Field 
        name="birthDay" 
        as="select"
        className={dateError ? "ERROR" : ""}
>
          {days.map((day, i) => (
            <option value={day} key={i}>
              {day}
            </option>
          ))}
        </Field>
        <Field name="birthMonth" as="select"  className={dateError ? "ERROR" : ""}>
          {months.map((month, i) => (
            <option value={month} key={i}>
              {month}
            </option>
          ))}
        </Field>
        <Field name="birthYear" as="select"  className={dateError ? "ERROR" : ""}>
          {years.map((year, i) => (
            <option value={year} key={i}>
              {year}
            </option>
          ))}
        </Field>
        {dateError && show && (
          <Popper
            trigger={trigger}
            placement={desktopView ? "left" : "top-start"}
            offsetNum={desktopView ? 15 : 8}
          >
            {dateError}
          </Popper>
        )}
      </div>
    </div>
  );
}

export default DateSelector;
