import React from 'react';
import './styles.css';

const ErrorMessage = ({ message }) => {
  return (
    <div className="error-message">
      <div className="error-icon" aria-hidden>!</div>
      <p>{message}</p>
    </div>
  );
};

export default ErrorMessage;


