import React from 'react';
import "./SearchBar.css"

const SearchBar = ({ searchQuery, setSearchQuery, setFilterCategory }) => {
  return (
    <div className="searchBar">
      <input 
        type="text" 
        placeholder="Search by title..." 
        value={searchQuery} 
        onChange={(e) => setSearchQuery(e.target.value)} 
        className="searchBars"
      />
      <h3 className="heading">Select Category</h3>
      <select onChange={(e) => setFilterCategory(e.target.value)} className="selectbar">
        <option value="">All</option>
        <option value="Work">Work</option>
        <option value="Personal">Personal</option>
        <option value="Others">Others</option>
      </select>
    </div>
  );
};

export default SearchBar;
