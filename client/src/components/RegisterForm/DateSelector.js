import React, { useState } from "react";
import "./index.css";

function DateSelector(
  birthDay,
  birthMonth,
  birthYear,
  handleChange,
) {
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
        <select
          name="birthDay"
          value={birthDay}
          onChange={handleChange}
          //   disabled={disabled}
        >
          {days.map((day, i) => (
            <option value={day} key={i}>
              {day}
            </option>
          ))}
        </select>
        <select
          name="birthMonth"
          value={birthMonth}
          onChange={handleChange}
        >
          {months.map((month, i) => (
            <option value={month} key={i}>
              {month}
            </option>
          ))}
        </select>
        <select
          name="birthYear"
          value={birthYear}
          onChange={handleChange}
        >
          {years.map((year, i) => (
            <option value={year} key={i}>
              {year}
            </option>
          ))}
        </select>
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
