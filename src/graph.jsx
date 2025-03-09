import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import Calculator from './Calculator';
import { useState } from 'react';



   

const Graph = ({}) => {
  const data = Array.from({ length: 21 }, (_, i) => {
    let x = i - 10;
    return { x: x, y: x * x };
  });




  const[close , setclose]=useState(false)

  if(close){
    return <Calculator/>
  }



  return (
    <div className="graph-overlay">
      <div className="graph-container">
        <button className="cancel-btn" onClick={()=>setclose(true)}>✖</button>
        <LineChart width={400} height={250} data={data}>
          <XAxis dataKey="x" />
          <YAxis />
          <CartesianGrid stroke="#444" strokeDasharray="5 5" />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="y" stroke="#00c3ff" strokeWidth={2} />
        </LineChart>
      </div>
    </div>
  );
};

export default Graph;
