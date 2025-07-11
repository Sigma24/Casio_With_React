import React, { useMemo } from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import { evaluate, parse } from 'mathjs';
import './graph.css';

export default function Graph({ expressions = [], startX = -10, endX = 10, step = 0.5, onClose }) {
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
      .replace(/logₓy->/g, 'logx')
      .replace(/eˣ/g, 'exp(x)')
      .replace(/10\^x/g, 'pow(10,x)');
  };

  const { data, domain, range, errorList } = useMemo(() => {
    const dataPoints = [];
    const colors = ['#00c3ff', '#ff0080', '#00cc66', '#ff6600', '#9933ff', '#cc0000']; // Support up to 6 functions
    const minMax = { minY: Infinity, maxY: -Infinity };
    const allErrors = [];

    const parsedExpressions = expressions.map((raw, index) => {
      try {
        const processed = preprocessExpression(raw);
        const parsed = parse(processed);
        return { label: raw, parsed, color: colors[index % colors.length] };
      } catch (err) {
        allErrors.push(`Error parsing "${raw}": ${err.message}`);
        return null;
      }
    });

    for (let x = startX; x <= endX; x += step) {
      const point = { x: parseFloat(x.toFixed(4)) };

      parsedExpressions.forEach(expr => {
        if (!expr) return;

        try {
          const y = expr.parsed.evaluate({
            x,
            asinh: x => Math.log(x + Math.sqrt(x * x + 1)),
            acosh: x => Math.log(x + Math.sqrt(x * x - 1)),
            atanh: x => 0.5 * Math.log((1 + x) / (1 - x)),
            logx: (y, x) => {
              if (x <= 0 || x === 1.0 || y <= 0) return NaN;
              return Math.log(y) / Math.log(x);
            }
          });

          if (typeof y === 'number' && isFinite(y)) {
            const val = parseFloat(y.toFixed(4));
            point[expr.label] = val;
            minMax.minY = Math.min(minMax.minY, val);
            minMax.maxY = Math.max(minMax.maxY, val);
          }
        } catch {
          // Ignore error for this x
        }
      });

      dataPoints.push(point);
    }

    return {
      data: dataPoints,
      domain: [startX, endX],
      range: [minMax.minY, minMax.maxY],
      errorList: allErrors
    };
  }, [expressions, startX, endX, step]);

  return (
    <div className="graph-overlay">
      <div className="graph-container">
        <button className="cancel-btn" onClick={onClose}>✖</button>

        <h3>Functions Plotted:</h3>
        <ul>
          {expressions.map((e, i) => (
            <li key={i}>f{i+1}(x) = {e}</li>
          ))}
        </ul>

        <p>Domain: [{domain[0]}, {domain[1]}] | Range: [
          {range[0] === Infinity ? "-∞" : range[0].toFixed(2)},
          {range[1] === -Infinity ? "∞" : range[1].toFixed(2)}
        ]</p>

        <div className="graph-wrapper">
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data}>
              <XAxis dataKey="x" />
              <YAxis domain={[range[0], range[1]]} />
              <CartesianGrid stroke="#eee" strokeDasharray="3 3" />
              <Tooltip />
              <Legend />
              {expressions.map((expr, i) => (
                <Line
                  key={i}
                  type="monotone"
                  dataKey={expr}
                  stroke={['#00c3ff', '#ff0080', '#00cc66', '#ff6600', '#9933ff', '#cc0000'][i % 6]}
                  strokeWidth={2}
                  dot={false}
                  name={`f${i+1}(x) = ${expr}`}
                />
              ))}
            </LineChart>
          </ResponsiveContainer>
        </div>

        {errorList.length > 0 && (
          <div className="graph-error">
            {errorList.map((err, i) => (
              <p key={i}>⚠️ {err}</p>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
