import React from "react";
//Components
import {CustomInput} from "../index";
//Styles
import { ImSearch } from "react-icons/im";
import "./index.css";

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
