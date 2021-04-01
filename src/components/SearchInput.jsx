import React from "react";

export const SearchInput = ({ handleChange }) => {
  return (
    <div className="search">
      <input
        type="text"
        onChange={handleChange}
        placeholder="Пошук за телефоном"
      />
      <div className="test">
        <img src={`icons/cancel.svg`} alt="cancel" className="cancel" />
      </div>

      <img src={`icons/search.svg`} alt="search" className="search-icon" />
    </div>
  );
};
