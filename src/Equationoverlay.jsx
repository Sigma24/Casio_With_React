import React, { useState, useEffect } from 'react';
import './Equationoverlay.css';
import {
 solveCubic,solveQuadratic,solveThreeVariable,solveTwoVariable
} from './equalogic';

export default function EquationOverlay({ type, visible, onClose, onEvaluate }) {
  const inputCountMap = {
    '2var': 6,
    '3var': 12,
    'quadratic': 3,
    'cubic': 4
  };

  const labelMap = {
    '2var': ['a', 'b', 'c', 'd', 'e', 'f'],
    '3var': Array.from({ length: 12 }, (_, i) => `val${i + 1}`),
    'quadratic': ['a', 'b', 'c'],
    'cubic': ['a', 'b', 'c', 'd']
  };

  const [inputs, setInputs] = useState([]);

  useEffect(() => {
    if (visible && type) {
      setInputs(Array(inputCountMap[type]).fill(''));
    }
  }, [visible, type]);

  const handleChange = (index, value) => {
    const newInputs = [...inputs];
    newInputs[index] = value;
    setInputs(newInputs);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      const numericInputs = inputs.map((val) => parseFloat(val));
      let result;
      let expression;

      switch (type) {
        case '2var':
          result = solveTwoVariable(numericInputs);
          expression = `(${inputs[0]})x + (${inputs[1]})y = ${inputs[2]}, (${inputs[3]})x + (${inputs[4]})y = ${inputs[5]}`;
          break;
        case '3var':
          result = solveThreeVariable(numericInputs);
          expression = `3-Var Equation System`;
          break;
        case 'quadratic':
          result = solveQuadratic(numericInputs);
          expression = `${inputs[0]}x² + ${inputs[1]}x + ${inputs[2]} = 0`;
          break;
        case 'cubic':
          result = solveCubic(numericInputs);
          expression = `${inputs[0]}x³ + ${inputs[1]}x² + ${inputs[2]}x + ${inputs[3]} = 0`;
          break;
        default:
          return;
      }

      onEvaluate(expression, result);
      onClose(); // Hide overlay
    } catch (err) {
      alert("Error: " + err.message);
    }
  };

  if (!visible) return null;

  return (
    <div className="equation-overlay">
      <div className="dialog-box">
        <button className="close-btn" onClick={onClose}>X</button>
        <h3>{type.toUpperCase()} Equation</h3>
        <form onSubmit={handleSubmit}>
          <div id="inputsContainer">
            {labelMap[type].map((label, idx) => (
              <input
                key={idx}
                type="text"
                placeholder={label}
                value={inputs[idx] || ''}
                onChange={(e) => handleChange(idx, e.target.value)}
              />
            ))}
          </div>
          <button type="submit" className="eval-btn">Evaluate</button>
        </form>
      </div>
    </div>
  );
}
