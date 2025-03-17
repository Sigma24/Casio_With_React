import React, { useState } from "react";
import "./ModeMenu.css";

const ModeMenu = ({ showMenu, setShowMenu, setSelectedMode, shift, reset }) => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [secondSelectedItem, setSecondSelectedItem] = useState(null);

  const Mode = ["MATH", "CMPLX", "BASEN", "STATISTICS", "EQUATION", "TABLE", "MATRIX", "VECTOR"];

  const subMenuData = {
    MATRIX: ["MatA", "MatB", "MatC"],
    VECTOR: ["vectA", "vectB", "vectC"],
    BASEN: ["Decimal", "Binary", "Hexa", "Octal"],
    STATISTICS: ["1-VAR", "A+BX", "--+CX²", "LN X", "eˣ", "A·Bˣ", "A·Xˣ", "1/X"],
    EQUATION: ["anX + bnY = cn", "aXn + bnY + cnZ = dn", "aX² + bX + c = 0", "aX³ + bX² + cX + d = 0"],
  };

  const secondMenuData = {
    MatA: ["1 x 1", "1 x 2", "1 x 3", "2 x 1", "2 x 2", "2 x 3", "3 x 1", "3 x 2", "3 x 3"],
    MatB: ["1 x 1", "1 x 2", "1 x 3", "2 x 1", "2 x 2", "2 x 3", "3 x 1", "3 x 2", "3 x 3"],
    MatC: ["1 x 1", "1 x 2", "1 x 3", "2 x 1", "2 x 2", "2 x 3", "3 x 1", "3 x 2", "3 x 3"],
    vectA: ["1 x 1", "1 x 2", "1 x 3", "2 x 1", "2 x 2", "2 x 3", "3 x 1", "3 x 2", "3 x 3"],
    vectB: ["1 x 1", "1 x 2", "1 x 3", "2 x 1", "2 x 2", "2 x 3", "3 x 1", "3 x 2", "3 x 3"],
    vectC: ["1 x 1", "1 x 2", "1 x 3", "2 x 1", "2 x 2", "2 x 3", "3 x 1", "3 x 2", "3 x 3"],
  };

  const handleModeClick = (mode) => {
    if (subMenuData[mode]) {
      setSelectedMode(mode); 
      setSelectedItem(mode);
    } else {
      setSelectedMode(mode);
      setShowMenu(false);
      reset();
    }
  };

  const handleSubMenuClick = (item) => {
    if (secondMenuData[item]) {
      setSecondSelectedItem(item);
    } else {
     
      setShowMenu(false);
      setSelectedItem(null);
    }
  };

  const handleSecondSubMenuClick = (item) => {
    
    setShowMenu(false);
    setSelectedItem(null);
    setSecondSelectedItem(null);
  };

  return (
    <>
      {showMenu && !selectedItem && (
        <div className="menu">
          <a href="#" className="cancel" onClick={() => setShowMenu(false)}>
            Cancel
          </a>
          <p className="menu-title">MODE</p>
          <ul className="menu-list">
            {Mode.map((value, index) => (
              <li key={index} className="menu-item" onClick={() => handleModeClick(value)}>
                {index + 1}: {value}
              </li>
            ))}
          </ul>
        </div>
      )}

      {selectedItem && !secondSelectedItem && (
        <div className="menu">
          <a href="#" className="cancel" onClick={() => setSelectedItem(null)}>
            Cancel
          </a>
          <p className="menu-title">{selectedItem.toUpperCase()}</p>
          <ul className="menu-list">
            {subMenuData[selectedItem]?.map((value, index) => (
              <li key={index} className="menu-item" onClick={() => handleSubMenuClick(value)}>
                {index + 1}: {value}
              </li>
            ))}
          </ul>
        </div>
      )}

      {secondSelectedItem && (
        <div className="menu">
          <a href="#" className="cancel" onClick={() => setSecondSelectedItem(null)}>
            Cancel
          </a>
          <p className="menu-title">{secondSelectedItem}</p>
          <ul className="menu-list">
            {secondMenuData[secondSelectedItem]?.map((value, index) => (
              <li key={index} className="menu-item" onClick={() => handleSecondSubMenuClick(value)}>
                {index + 1}: {value}
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
};

export default ModeMenu;
