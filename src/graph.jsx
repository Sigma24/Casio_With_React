import React, { useMemo } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { evaluate, parse } from 'mathjs';
import './graph.css';

export default function Graph({ expression, startX = -10, endX = 10, step = 0.5, onClose }) {
  const preprocessExpression = (expr) => {
    if (!expr) return '';
    
    return expr
      .replace(/sin⁻¹/g, 'asin')
      .replace(/cos⁻¹/g, 'acos')
      .replace(/tan⁻¹/g, 'atan')
      .replace(/sinh⁻¹/g, 'asinh')
      .replace(/cosh⁻¹/g, 'acosh')
      .replace(/tanh⁻¹/g, 'atanh')
      .replace(/ln/g, 'log')
      .replace(/logₓy->/g, 'logx') // Custom log base function
      .replace(/eˣ/g, 'exp(x)')
      .replace(/10\^x/g, 'pow(10,x)');
  };

  const { data, domain, range, processedExpression, error } = useMemo(() => {
    const processedExpr = preprocessExpression(expression);
    const dataPoints = [];
    let minY = Infinity, maxY = -Infinity;
    let hasError = false;

    // Define custom functions for math.js
    const customScope = {
      asinh: (x) => Math.log(x + Math.sqrt(x * x + 1)),
      acosh: (x) => Math.log(x + Math.sqrt(x * x - 1)),
      atanh: (x) => 0.5 * Math.log((1 + x) / (1 - x)),
      logx: (y, x) => {
        if (x <= 0 || x === 1.0 || y <= 0) return NaN;
        return Math.log(y) / Math.log(x);
      }
    };

    try {
      const parsed = parse(processedExpr);
      
      for (let x = startX; x <= endX; x += step) {
        try {
          const y = parsed.evaluate({ ...customScope, x });
          if (typeof y === 'number' && isFinite(y)) {
            minY = Math.min(minY, y);
            maxY = Math.max(maxY, y);
            dataPoints.push({ x: parseFloat(x.toFixed(4)), y: parseFloat(y.toFixed(4)) });
          }
        } catch (e) {
          // Skip invalid points
        }
      }
    } catch (err) {
      console.error("Error parsing expression:", err);
      hasError = true;
    }

    return {
      data: dataPoints,
      domain: [startX, endX],
      range: [minY, maxY],
      processedExpression: processedExpr,
      error: hasError
    };
  }, [expression, startX, endX, step]);

  return (
    <div className="graph-overlay">
      <div className="graph-container">
        <button className="cancel-btn" onClick={onClose}>✖</button>
        <h3>f(x) = {expression}</h3>
        <p>Domain: [{domain[0]}, {domain[1]}] | Range: [
          {range[0] === Infinity ? "-∞" : range[0].toFixed(2)}, 
          {range[1] === -Infinity ? "∞" : range[1].toFixed(2)}
        ]</p>
        
        <div className="graph-wrapper">
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={data}>
              <XAxis dataKey="x" />
              <YAxis domain={[range[0], range[1]]} />
              <CartesianGrid stroke="#eee" strokeDasharray="3 3" />
              <Tooltip />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="y" 
                stroke="#00c3ff" 
                strokeWidth={2} 
                dot={false} 
                name={`f(x) = ${expression}`}
              />
            </LineChart>
          </ResponsiveContainer>
          
          {/* Display the processed function here */}
      
        </div>

        {error && (
          <div className="graph-error">
            Error: Invalid expression. Please check your input.
          </div>
        )}
      </div>
    </div>
  );
}