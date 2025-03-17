
import React from "react";
import "./conv.css";

const StatsShift = ({ showStatsMenu, setShowStatsMenu, shift, resetshift }) => {
  
  const conversions =  [
    "1-Var",      
    "A+BX",       
    "+cx²",  
    "ln x",      
    "e^x",    
    "A.B^X",
    "A.X^B",       
    "1/X",       
];


  const handleConversionClick = (conversion) => {
    console.log("Selected Conversion:", conversion);
    setShowStatsMenu(false);
    resetshift();
  };

  return (
    <>
      {showStatsMenu && (
        <div className="menu">
          <a href="#" className="cancel" onClick={() => setShowStatsMenu(false)}>
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

export default StatsShift;