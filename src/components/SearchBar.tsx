import React from 'react';

interface SearchBarProps {
  search: string;
}

export const SearchBar: React.FunctionComponent<SearchBarProps> = ({ search }) => {
  return (
    <div>
      <input type="text" placeholder={search} />
      <button>Search</button>
    </div>
  );
};
