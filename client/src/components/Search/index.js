import React, { useRef, useState } from "react";
import { SearchIcon } from "../../svg";
import { CustomInput } from "../index";
import "./index.css";
const Search = ({ onChange , setShowSearchMenu }) => {
  const [showIcon, setShowIcon] = useState(true);
  const input = useRef(null);
  return (
    <>
        <div
          className="searchInputs"
          onClick={() => {
            input.current.focus();
            setShowSearchMenu(true);
          }}
        >
          {showIcon && <SearchIcon color={"#5c6e58"} />}
          <CustomInput
            innerRef={input}
            className="search-input"
            type="text"
            placeholder="Search in ZIWIBook"
            onChange={onChange}
            onFocus={() => {
              setShowIcon(false);
              setShowSearchMenu(true);
            }}
            onBlur={() => setShowIcon(true)}
          />
        </div>
    </>
  );
};

export default Search;
