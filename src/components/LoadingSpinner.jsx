// components/LoadingSpinner.js
import React from 'react';
import './LoadingSpinner.css';

const LoadingSpinner = ({ fullPage = false }) => (
  <div className={`loading-spinner ${fullPage ? 'full-page' : ''}`}>
    <div className="spinner"></div>
  </div>
);

export default LoadingSpinner;