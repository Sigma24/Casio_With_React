import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const Graph = () => {
  const data = Array.from({ length: 21 }, (_, i) => {
    let x = i - 10;
    return { x: x, y: x * x };
  });

  return (
    <LineChart width={500} height={300} data={data}>
      <XAxis dataKey="x" />
      <YAxis />
      <CartesianGrid stroke="#eee" />
      <Tooltip />
      <Legend />
      <Line type="monotone" dataKey="y" stroke="#8884d8" />
    </LineChart>
  );
};

export default Graph;
