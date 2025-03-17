
import React from "react";
import "./cmplx.css";

const CmplxShift = ({ showCmplxMenu, setShowCmplxMenu, shift, resetshift }) => {
  
  const conversions =[
    "1: Re( )",         
    "2: Im( )",         
    "3: r∠θ",          
    "4: Conjg",        
    "5: Abs( )",
    "6: Arg( )",     
];;

  const handleConversionClick = (conversion) => {
    console.log("Selected Conversion:", conversion);
    setShowCmplxMenu(false);
    resetshift();
  };

  return (
    <>
      {showCmplxMenu && (
        <div className="menu">
          <a href="#" className="cancel" onClick={() => setShowCmplxMenu(false)}>
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

export default CmplxShift;