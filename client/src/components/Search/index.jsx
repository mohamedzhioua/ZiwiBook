import * as React from "react";
import { SearchIcon } from "../../assets/svg";
import { CustomInput } from "../index";
import "./index.css";
const Search = ({ onChange, setShowSearchMenu }) => {
  const [showIcon, setShowIcon] = React.useState(true);
  const input = React.useRef(null);
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
