import * as React from "react";
import { useMediaQuery } from "react-responsive";
import classes from "./register.module.css";
import { Field } from "formik";
import {Popper} from "../index";
import ErrorSVG from "../../assets/svg/Error.svg";

function DateSelector({ birthDay, birthMonth, birthYear , dateError}) {
  const [trigger, setTrigger] = React.useState(null);
  const [show, setShow] = React.useState(false);

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
      <div className={classes.colHeader}>Birthday
      {dateError && 
         <img src={ErrorSVG} alt="ErrorSVG"
       />}
       </div>
      <div className={classes.select_grid}>
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
        <Field name="birthMonth" as="select"  className={dateError ? `${classes.ERROR}` : ""}>
          {months.map((month, i) => (
            <option value={month} key={i}>
              {month}
            </option>
          ))}
        </Field>
        <Field name="birthYear" as="select"  className={dateError ? `${classes.ERROR}` : ""}>
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
