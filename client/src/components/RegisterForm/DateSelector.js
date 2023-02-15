import React, { useState } from "react";
import "./index.css";
import { Field } from "formik";

function DateSelector({ birthDay, birthMonth, birthYear }) {
  const [show, setShow] = useState(false);

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
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
    >
      <div className="colHeader">Date of birth</div>
      <div className="DateSelector-grid">
        <Field name="birthDay" as="select">
          {days.map((day, i) => (
            <option value={day} key={i}>
              {day}
            </option>
          ))}
        </Field>
        <Field name="birthMonth" as="select">
          {months.map((month, i) => (
            <option value={month} key={i}>
              {month}
            </option>
          ))}
        </Field>
        <Field name="birthYear" as="select">
          {years.map((year, i) => (
            <option value={year} key={i}>
              {year}
            </option>
          ))}
        </Field>
        {/* {dateError && show && (
          <Popper
            trigger={trigger}
            placement={desktopView ? "left" : "top-start"}
            offsetNum={desktopView ? 15 : 8}
          >
            {dateError}
          </Popper>
        )} */}
      </div>
    </div>
  );
}

export default DateSelector;
