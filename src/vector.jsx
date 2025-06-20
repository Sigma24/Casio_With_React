import React, { useState } from "react";
import "./vector.css";

const VectorShift = ({ showVectorMenu, setShowVectorMenu, resetshift,setInput}) => {
  
  const [selectedItem, setSelectedItem] = useState(null);

  const vectors = ["vectA", "vectB", "vectC", "Data", "Dot"];


const handleConversionClick = (vector) => {
  if (vector === "Data") {
    const stored = JSON.parse(localStorage.getItem("vectors")) || {};

    const vectA = stored.vectA || [0, 0];
    const vectB = stored.vectB || [0, 0];
    const vectC = stored.vectC || [0, 0];

    const format = (label, values) => `${label}={${values.join(",")}}`;

    const resultString = [
      format("vectA", vectA),
      format("vectB", vectB),
      format("vectC", vectC)
    ].join(", ");

    setInput(resultString);
  } else if (vector === "Dot") {
    setInput(".");
  } else {
    setInput((inp) => inp + vector);
  }

  setShowVectorMenu(false);
  resetshift();
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

     
    </>
  );
};

export default VectorShift;
