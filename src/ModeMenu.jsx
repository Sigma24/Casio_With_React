import React, { useState } from "react";
import "./ModeMenu.css";

const ModeMenu = ({ showMenu, setShowMenu, setSelectedMode, reset, onEquationSelect, onVectorSizeSelect,setanswer }) => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [secondSelectedItem, setSecondSelectedItem] = useState(null);

  const Mode = [
    "MATH",
    "CMPLX",
    "BASEN",
    "EQUATION",
    "VECTOR"
  ];

  const subMenuData = {

    VECTOR: ["vectA", "vectB", "vectC"],

    EQUATION: [
      "anX + bnY = cn",
      "aXn + bnY + cnZ = dn",
      "aX² + bX + c = 0",
      "aX³ + bX² + cX + d = 0"
    ]
  };

  const secondMenuData = {
    vectA: ["1:2", "1:3"],
    vectB: ["1:2", "1:3"],
    vectC: ["1:2", "1:3"]
  };

  const handleModeClick = (mode) => {

    if(mode=="BASEN")
      setanswer("Dec000000")
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
      console.log(`Selected vector: ${item}`);
    } else {
      if (selectedItem === "EQUATION") {
        let type = "";
        switch (item) {
          case "anX + bnY = cn":
            type = "2var";
            break;
          case "aXn + bnY + cnZ = dn":
            type = "3var";
            break;
          case "aX² + bX + c = 0":
            type = "quadratic";
            break;
          case "aX³ + bX² + cX + d = 0":
            type = "cubic";
            break;
          default:
            break;
        }

        if (type && onEquationSelect) {
          onEquationSelect(type);
        }
      }

      setShowMenu(false);
      setSelectedItem(null);
    }
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
              <li
                key={index}
                className="menu-item"
                onClick={() => handleModeClick(value)}
              >
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
              <li
                key={index}
                className="menu-item"
                onClick={() => handleSubMenuClick(value)}
              >
                {index + 1}: {value}
              </li>
            ))}
          </ul>
        </div>
      )}

      {secondSelectedItem && (
        <div className="menu">
          <a
            href="#"
            className="cancel"
            onClick={() => setSecondSelectedItem(null)}
          >
            Cancel
          </a>
          <p className="menu-title">{secondSelectedItem}</p>
          <ul className="menu-list">
            {secondMenuData[secondSelectedItem]?.map((size, index) => (
              <li
                key={index}
                className="menu-item"
                onClick={() => {
                  if (onVectorSizeSelect) {
                    console.log(
                      `Calling overlay for ${secondSelectedItem} with size ${size}`
                    );
                    onVectorSizeSelect(secondSelectedItem, size);
                  }
                  setShowMenu(false);
                  setSelectedItem(null);
                  setSecondSelectedItem(null);
                }}
              >
                {index + 1}: {size}
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
};

export default ModeMenu;
