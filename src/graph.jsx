import React, { useMemo } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { evaluate, parse } from 'mathjs';
import './graph.css';

export default function Graph({ expression, startX = -10, endX = 10, step = 0.5, onClose }) {
  const { data, domain, range } = useMemo(() => {
    const parsed = parse(expression); // parse the expression once
    const dataPoints = [];
    let minY = Infinity, maxY = -Infinity;

    for (let x = startX; x <= endX; x += step) {
      try {
        const y = parsed.evaluate({ x });
        if (typeof y === 'number' && isFinite(y)) {
          minY = Math.min(minY, y);
          maxY = Math.max(maxY, y);
          dataPoints.push({ x: parseFloat(x.toFixed(4)), y: parseFloat(y.toFixed(4)) });
        } else {
          // Skip undefined points (e.g., log(-1), 1/0)
        }
      } catch (err) {
        // Skip errors (e.g., sqrt of negative, log(0), etc.)
      }
    }

    return {
      data: dataPoints,
      domain: [startX, endX],
      range: [minY, maxY]
    };
  }, [expression, startX, endX, step]);

  return (
    <div className="graph-overlay">
      <div className="graph-container">
        <button className="cancel-btn" onClick={onClose}>✖</button>
        <h3>f(x) = {expression}</h3>
        <p>Domain: [{domain[0]}, {domain[1]}] | Range: [{range[0].toFixed(2)}, {range[1].toFixed(2)}]</p>
        <LineChart width={400} height={250} data={data}>
          <XAxis dataKey="x" />
          <YAxis domain={range} />
          <CartesianGrid stroke="#fff" strokeDasharray="3 3" />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="y" stroke="#00c3ff" strokeWidth={2} dot={false} />
        </LineChart>
      </div>
    </div>
  );
}
