import React from "react";
import "./HypMenu.css";

const ConstMenu = ({ showConstMenu, setShowConstMenu, setSelectedMode ,shift,resetshift}) => {
  const modes = ["bio", "Cosh" , "Tanh","Sinh⁻¹","Cosh⁻¹","Tanh⁻¹"];

  const handleModeClick = (mode) => {
    setSelectedMode(mode); 
    setShowConstMenu(false); 
    resetshift()
  };

  return (
    <>
      {showConstMenu && (
        <div className="menu">
          <a href="#" className="cancel" onClick={() => setShowConstMenu(false)}>
            Cancel
          </a>
          <p className="menu-title">Constants</p>
          <ul className="menu-list">
            {modes.map((mode, index) => (
              <li key={index} className="menu-item" onClick={() => handleModeClick(mode)}>
                {index + 1}: {mode}
              </li>
            ))}
          </ul>
        </div>
      )}    
    </>
  );
};

export default ConstMenu;
