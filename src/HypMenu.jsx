import React from "react";
import "./HypMenu.css";

const HypeMenu = ({ showHypeMenu, setShowHypeMenu, setInput }) => {
  const modes = [
    { label: "Sinh", func: "sinh(" },
    { label: "Cosh", func: "cosh(" },
    { label: "Tanh", func: "tanh(" },
    { label: "Sinh⁻¹", func: "arcsinh(" },
    { label: "Cosh⁻¹", func: "arccosh(" },
    { label: "Tanh⁻¹", func: "arctanh(" },
  ];

  const handleModeClick = (mode) => {
    setInput((prev) => prev + mode.func);  // ✅ Insert function directly
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
                {index + 1}: {mode.label}
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
};


export default HypeMenu;
