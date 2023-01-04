import React from "react";
import { ImSearch } from "react-icons/im";
import CustomInput from "../CustomInput/CustomInput";
import "./Search.css";
const Search = ({ onChange }) => {
  return (
    <div className="searchInputs">
      <CustomInput
        className="search-input"
        type="search"
        placeholder="Search Memories . . . . ."
        onChange={onChange}
      />
      <div className="searchIcon">
        <ImSearch />
      </div>
    </div>
  );
};

export default Search;
