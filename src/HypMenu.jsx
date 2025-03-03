import React from "react";
import "./HypMenu.css";

const HypeMenu = ({ showHypeMenu, setShowHypeMenu, setSelectedMode }) => {
  const modes = ["Sinh", "Cosh" , "Tanh","Sinh⁻¹","Cosh⁻¹","Tanh⁻¹"];

  const handleModeClick = (mode) => {
    setSelectedMode(mode); 
    setShowHypeMenu(false); 
  };

  return (
    <>
      {showHypeMenu && (
        <div className="menu">
          <a href="#" className="cancel" onClick={() => setShowHypeMenu(false)}>
            Cancel
          </a>
          <p className="menu-title">SELECT MODE</p>
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

export default HypeMenu;
