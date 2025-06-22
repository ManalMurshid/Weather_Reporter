import React from 'react';
import searchIcon from '../assets/search.png';

const SearchBar = ({
  inputRef,
  cityInput,
  onInputChange,
  onKeyDown,
  onSearchClick,
}) => (
  <div className="search-bar">
    <input
      id="city-input"
      name="city"
      ref={inputRef}
      type="text"
      placeholder="Search City"
      value={cityInput}
      onChange={onInputChange}
      onKeyDown={onKeyDown}
    />
    <button>
      <img
        src={searchIcon}
        alt="Search"
        className="search-icon"
        onClick={onSearchClick}
      />
    </button>
  </div>
);

export default SearchBar;