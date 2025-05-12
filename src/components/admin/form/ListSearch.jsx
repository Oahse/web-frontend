import React, { useState } from 'react';

const ListSearch = ({ onSearch }) => {
  // State to manage the search query
  const [searchQuery, setSearchQuery] = useState('');

  // Event handler to update search query
  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Handle form submission to trigger search
  const handleSubmit = (e) => {
    e.preventDefault();
    // Call the onSearch callback with the search query
    if (onSearch) {
      onSearch(searchQuery);
    }
  };

  return (
    <form className="form-search" onSubmit={handleSubmit}>
      <fieldset className="name">
        <input
          type="text"
          placeholder="Search here..."
          value={searchQuery}
          onChange={handleInputChange}
          className="search-input"
          name="name"
          tabIndex="2"
          aria-required="true"
          required
        />
      </fieldset>
      <div className="button-submit">
        <button type="submit">
          <i className="icon-search"></i>
        </button>
      </div>
    </form>
  );
};

export default ListSearch;
