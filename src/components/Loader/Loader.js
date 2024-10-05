// src/PrawnLoader.js
import React from "react";
import './Loader.css'; // Import the custom CSS

const Loader = () => {
  return (
    <div className="prawn-loader-container">
      <div className="prawn">
        <div className="prawn-body"></div>
        <div className="prawn-tail"></div>
        <div className="prawn-eye"></div>
      </div>
    </div>
  );
};

export default Loader;