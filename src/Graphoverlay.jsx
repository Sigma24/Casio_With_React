import React, { useState } from 'react';
import './Equationoverlay.css'; // Reuse same CSS

export default function GraphRangeOverlay({ visible, onClose, onPlot }) {
  const [xStart, setXStart] = useState('');
  const [xEnd, setXEnd] = useState('');

  const handlePlot = (e) => {
    e.preventDefault();
    const start = parseFloat(xStart);
    const end = parseFloat(xEnd);

    if (isNaN(start) || isNaN(end) || start >= end) {
      alert("Please enter a valid range: Start < End.");
      return;
    }

    onPlot(start, end); // Pass to parent
    onClose(); // Hide overlay
  };

  if (!visible) return null;

  return (
    <div className="equation-overlay">
      <div className="dialog-box">
        <button className="close-btn" onClick={onClose}>X</button>
        <h3>Graph Range Input</h3>
        <form onSubmit={handlePlot}>
          <div id="inputsContainer">
            <input
              type="number"
              placeholder="Start X"
              value={xStart}
              onChange={(e) => setXStart(e.target.value)}
            />
            <input
              type="number"
              placeholder="End X"
              value={xEnd}
              onChange={(e) => setXEnd(e.target.value)}
            />
          </div>
          <button type="submit" className="eval-btn">Plot</button>
        </form>
      </div>
    </div>
  );
}
