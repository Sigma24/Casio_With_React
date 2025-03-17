import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import "./graph.css"

const Graph = ({ onClose }) => {
  const data = Array.from({ length: 21 }, (_, i) => {
    let x = i - 10;
    return { x: x, y: x * x };
  });

  return (
    <div className="graph-overlay">
      <div className="graph-container">
        <button className="cancel-btn" onClick={onClose}>✖</button>
        <LineChart width={400} height={250} data={data}>
          <XAxis dataKey="x" />
          <YAxis />
          <CartesianGrid stroke="#fff" strokeDasharray="3 3" />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="y" stroke="#00c3ff" strokeWidth={2} />
        </LineChart>
      </div>
    </div>
  );
};

export default Graph;
