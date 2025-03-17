import React from "react";
import "./conv.css";

const ConstMenu = ({ showConstMenu, setShowConstMenu, setSelectedMode ,shift,resetshift}) => {
  const modes = ["1: Proton mass                        mp",
    "   1.67262192369 × 10⁻²⁷ kg",

    "2: Neutron mass                      mn",
    "   1.67492749804 × 10⁻²⁷ kg",

    "3: Electron mass                      me",
    "   9.1093837015 × 10⁻³¹ kg",

    "4: Muon mass                         mu",
    "   1.883531627 × 10⁻²⁸ kg",

    "5: Bohr radius                        a₀",
    "   5.29177210903 × 10⁻¹¹ m",

    "6: Planck constant                   h",
    "   6.62607015 × 10⁻³⁴ Js",

    "7: Nuclear magneton                 uN",
    "   5.0507837461 × 10⁻²⁷ J/T",

    "8: Bohr magneton                     uB",
    "   9.27400999457 × 10⁻²⁴ J/T",

    "9: Planck constant, rationalized   ħ",
    "   1.054571817 × 10⁻³⁴ Js",

    "10: Fine-structure constant         α",
    "   0.0072973525693",
    
    "11: Classical electron radius      re",
    "   2.8179403262 × 10⁻¹⁵ m",
    "12: Atomic mass constant          u",
    "   1.66053906660 × 10⁻²⁷ kg",
    "13: Faraday constant                F",
    "   96485.33289 C/mol"
  ];;

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
