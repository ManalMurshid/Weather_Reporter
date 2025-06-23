import React from 'react';
import './Spinner.css';
import spinnerGif from '../assets/spinner.gif'; 

const Spinner = () => {
  return (
    <div className="spinner-overlay">
      <img src={spinnerGif} alt="Loading..." className="spinner" />
    </div>
  );
};

export default Spinner;
