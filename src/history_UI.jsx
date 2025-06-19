import React from 'react';
import './historyui.css';

export default function HistoryOverlay({ visible, onClose, historyItems, onDelete }) {
  if (!visible) return null;

  return (
    <div className="overlay">
      <div className="dialog-box">
        <button className="close-btn" onClick={onClose}>X</button>
        <h2 className="title">History</h2>
        <div className="history-list">
          {historyItems.map((item, index) => (
            <div key={index} className="history-item">
              <p>{item.expressionWithResult}</p>
              <hr />
              <div className="meta">
                <span>{item.date}, {item.time}</span>
                <button onClick={() => onDelete(index)}>
                  <img
                    src="https://cdn-icons-png.flaticon.com/512/1214/1214428.png"
                    alt="Delete"
                    width={18}
                    height={18}
                  />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
