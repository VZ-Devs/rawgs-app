import React from 'react';

import {FaSearch} from "react-icons/fa"
import "./SearchBar.css"

interface SearchBarProps {
  placeholder: string;
}

export const SearchBar: React.FunctionComponent<SearchBarProps> = ({ placeholder }) => {
  return (
    <div className="input-wrapper">
      <input type="text" placeholder={placeholder} />
      <FaSearch id="search-icon" />
    </div>
  );
};
