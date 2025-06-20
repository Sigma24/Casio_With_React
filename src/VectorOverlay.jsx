import React, { useState, useEffect } from "react";
import "./VectorOverlay.css";

export default function VectorOverlay({ visible, onClose, vectorName, vectorSize }) {
  const numInputs = vectorSize ? parseInt(vectorSize.split(":")[1]) : 0;
  const [values, setValues] = useState(Array(numInputs).fill(""));

  useEffect(() => {
    setValues(Array(numInputs).fill(""));
  }, [vectorSize, vectorName]);

  if (!visible || !vectorName || !vectorSize) return null;

  const handleChange = (index, newVal) => {
    const updated = [...values];
    updated[index] = newVal;
    setValues(updated);
  };

  const handleSave = () => {
    const stored = JSON.parse(localStorage.getItem("vectors")) || {};
    stored[vectorName] = values.map((v) => parseFloat(v)); 
    localStorage.setItem("vectors", JSON.stringify(stored));
    onClose();
  };

  return (
    <div className="overlay">
      <div className="dialog-box">
        <button className="close-btn" onClick={onClose}>X</button>
        <h2 className="title">Enter values for {vectorName}</h2>
        <div className="input-container">
          {values.map((val, i) => (
            <input
              key={i}
              type="text"
              value={val}
              onChange={(e) => handleChange(i, e.target.value)}
              placeholder={`Value ${i + 1}`}
              className="vector-input"
            />
          ))}
        </div>
        <button className="save-btn" onClick={handleSave}>Save</button>
      </div>
    </div>
  );
}
