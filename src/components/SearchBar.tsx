import React, { useState } from 'react';

import {FaSearch} from "react-icons/fa"
import "./SearchBar.css"

interface SearchBarProps {
  placeholder: string;
  onSearch: (search: string) => void;
}

export const SearchBar: React.FunctionComponent<SearchBarProps> = ({ placeholder, onSearch }) => {

  const [input, setInput] = useState("");

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(input);
  };

  return (
    <form onSubmit={handleFormSubmit} className="input-wrapper">
      <input
        type="text"
        placeholder={placeholder}
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <FaSearch id="search-icon" />
    </form>
  );
};
