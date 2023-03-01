import React from "react";
import { SearchIcon } from "../../svg";
import {CustomInput} from "../index";
import "./index.css";

const Search = ({ onChange }) => {
  return (
    <div className="searchInputs">
      <CustomInput
        className="search-input"
        type="search"
        placeholder="Search in ZIWIBook . . . . ."
        onChange={onChange}
      />
        <SearchIcon color={"#65676b"}/>
    </div>
  );
};

export default Search;
