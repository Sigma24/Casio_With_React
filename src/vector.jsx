import React, { useState } from "react";
import "./matrix.css";

const VectorShift = ({ showVectorMenu, setShowVectorMenu, shift, resetshift, onDataSelect }) => {
  
  const [selectedItem, setSelectedItem] = useState(null);

  const vectors = ["vectA", "vectB", "vectC", "Data", "Dot"];
  const dataSubMenu = ["vectA", "vectB", "vectC"];

  const handleConversionClick = (vector) => {
    if (vector === "Data") {
      setSelectedItem("Data"); 
    } else {
      console.log("Selected Conversion:", vector);
      setShowVectorMenu(false);
      resetshift();
    }
  };

  const handleDataClick = async (item) => {
    console.log(`Data selected for: ${item}`);

  
    onDataSelect(item); 
    
    setShowVectorMenu(false);
    setSelectedItem(null);
  };

  return (
    <>
      {showVectorMenu && !selectedItem && (
        <div className="menu">
          <a href="#" className="cancel" onClick={() => setShowVectorMenu(false)}>
            Cancel
          </a>
          <p className="menu-title">MATRIX</p>
          <ul className="menu-list">
            {vectors.map((conversion, index) => (
              <li
                key={index}
                className="menu-item"
                onClick={() => handleConversionClick(conversion)}
              >
                {index + 1}: {conversion}
              </li>
            ))}
          </ul>
        </div>
      )}

      {selectedItem === "Data" && (
        <div className="menu">
          <a href="#" className="cancel" onClick={() => setSelectedItem(null)}>
            Cancel
          </a>
          <p className="menu-title">DATA</p>
          <ul className="menu-list">
            {dataSubMenu.map((value, index) => (
              <li
                key={index}
                className="menu-item"
                onClick={() => handleDataClick(value)}
              >
                {index + 1}: {value}
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
};

export default VectorShift;
