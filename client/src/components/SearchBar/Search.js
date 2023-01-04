import React from "react";
import { GoSearch } from "react-icons/go";
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
        <GoSearch />
      </div>
    </div>
  );
};

export default Search;
