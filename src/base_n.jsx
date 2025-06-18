
import React from "react";
import "./base_n.css";

const BaseShift = ({ showBaseMenu, setShowBaseMenu, shift, resetshift,setInput }) => {
  
  const conversions = ["and","or","nor","neg","xor","xnor"];

  const handleConversionClick = (conversion) => {
    console.log("Selected Conversion:", conversion);
    setShowBaseMenu(false);
    if(conversion=="not"|| conversion=="neg"){
      setInput(inp=>inp+conversion+"(")
    }else{
    setInput(inp=>inp+conversion)
    }
    resetshift();
  };

  return (
    <>
      {showBaseMenu && (
        <div className="menu">
          <a href="#" className="cancel" onClick={() => setShowBaseMenu(false)}>
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

export default BaseShift;