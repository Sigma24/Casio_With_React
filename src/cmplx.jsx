
import React from "react";
import "./cmplx.css";

const CmplxShift = ({ showCmplxMenu, setShowCmplxMenu, resetshift,setInput }) => {
  
  const conversions =[
           
    "⯈a+bi",
    "⯈r∠θ",          
    "conj",
    "arg"
     
];;

  const handleConversionClick = (conversion) => {
    if(conversion=="conj" || conversion=="arg"){
      setInput(inp=>inp+conversion+"(")
    }else{
    setInput(inp=>inp+conversion)
    }
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
          <p className="menu-title">SELECT Complex Operation</p>
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