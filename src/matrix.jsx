
import React from "react";
import "./conv.css";

const MatrixShift = ({ showMatrixMenu, setShowMatrixMenu, shift, resetshift }) => {
  
  const conversions = ["bio", "Cosh" , "Tanh","Sinh⁻¹","Cosh⁻¹","Tanh⁻¹"];

  const handleConversionClick = (conversion) => {
    console.log("Selected Conversion:", conversion);
    setShowMatrixMenu(false);
    resetshift();
  };

  return (
    <>
      {showMatrixMenu && (
        <div className="menu">
          <a href="#" className="cancel" onClick={() => setShowMatrixMenu(false)}>
            Cancel
          </a>
          <p className="menu-title">SELECT CONVERSION</p>
          <ul className="menu-list">
            {conversions.map((conversion, index) => (
              <li key={index} className="menu-item" onClick={() => handleConversionClick(conversion)}>
                {index + 1}: {conversion}
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
};

export default MatrixShift;