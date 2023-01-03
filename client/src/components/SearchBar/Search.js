import React, { useState } from 'react'
import {GoSearch} from "react-icons/go"
import "./Search.css"
const Search = () => {
    const[input,setInput]=useState('')

  return (
    <div className='searchInputs'>
    <input
    className='search-input'
      type="search"
      placeholder="Search"
      aria-label="Search"
      onChange={(e)=>setInput(e.target.value)}
    />
          <div className="searchIcon">
            <GoSearch/>
          </div>

    </div>
   )
}

export default Search