// ShowHistory.jsx
import React, { useEffect, useState } from 'react';
import HistoryManager from './History';

const ShowHistory = () => {
  const [historyItems, setHistoryItems] = useState([]);

  useEffect(() => {
    const stored = HistoryManager.getAllHistory();
    setHistoryItems(stored);
  }, []);

  return (
    <div className="menu">
      <h3>History</h3>
      <ul>
        {historyItems.map((item, index) => (
          <li key={index}>
            <strong>{item.expressionWithResult}</strong><br />
            <small>{item.date} {item.time}</small>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ShowHistory;
