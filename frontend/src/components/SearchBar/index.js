import React, { useState } from 'react';
import './styles.css';

const SearchBar = ({ onSearch, currentUsername, disabled }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      onSearch(searchTerm.trim());
      setSearchTerm('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSubmit(e);
    }
  };

  return (
    <div className="search-section">
      <form onSubmit={handleSubmit} className="search-container">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Enter GitHub username (e.g., 'microsoft', 'google')"
          className="search-input"
          disabled={disabled}
        />
        <button 
          type="submit" 
          className="search-btn"
          disabled={disabled || !searchTerm.trim()}
        >
          Search
        </button>
      </form>
      <div className="default-user">
        <span>Current user: <strong>{currentUsername}</strong></span>
      </div>
    </div>
  );
};

export default SearchBar;


