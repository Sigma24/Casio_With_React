import React from "react";
import "./shift.css";

const ShiftMenu = ({ showShiftMenu, setShowShiftMenu, setSelectedMode,shift,resetshift }) => {
  const modes = [" MTHIO", "LINEIO", "DEG", "RAD", "GRAD", "FIX", "SCI","NORM"];

  const handleModeClick = (mode) => {
    setSelectedMode(mode); 
    setShowShiftMenu(false);
    resetshift(); 
  };

  return (
    <>
      {showShiftMenu && (
        <div className="menu">
          <a href="#" className="cancel" onClick={() => setShowShiftMenu(false)}>
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

export default ShiftMenu;