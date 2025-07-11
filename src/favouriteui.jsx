import React from 'react';
import './historyui.css'; 

export default function FavouritesOverlay({ visible, onClose, favourites, onDelete }) {
  if (!visible) return null;

  return (
    <div className="overlay">
      <div className="dialog-box">
        <button className="close-btn" onClick={onClose}>X</button>
        <h2 className="title">Favourites</h2>
        <div className="history-list">
          {favourites.length === 0 ? (
            <p style={{ color: 'gray' }}>No favourites added yet.</p>
          ) : (
            favourites.map((expression, index) => (
              <div key={index} className="history-item">
                <p>{expression}</p>
                <div className="meta">
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
            ))
          )}
        </div>
      </div>
    </div>
  );
}
