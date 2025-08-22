import React from 'react';
import './styles.css';

const LoadingSpinner = () => {
  return (
    <div className="loading-spinner">
      <div className="spinner"></div>
      <p>Fetching repository data...</p>
    </div>
  );
};

export default LoadingSpinner;


