import React from 'react';

export default function HistoryList({ historyItems, onDelete, onBack }) {
  return (
    <div className="bg-black min-h-screen text-white px-4 py-6">
      <div
        className="text-blue-400 text-lg cursor-pointer mb-4"
        onClick={onBack}
      >
        back
      </div>

      <h1 className="text-center text-2xl mb-6 font-mono">History</h1>

      {historyItems.map((item, index) => (
        <div
          key={index}
          className="bg-gray-900 border border-gray-400 rounded-lg p-4 mb-4 shadow-md font-mono relative"
        >
          <p className="text-white text-base mb-2">
            {item.expressionWithResult}
          </p>
          <hr className="border-gray-600 mb-2" />
          <div className="flex justify-between items-center text-gray-300 text-sm">
            <div>{item.date}, {item.time}</div>
            <button
              onClick={() => onDelete(index)}
              className="hover:opacity-80"
            >
              <img
                src="https://cdn-icons-png.flaticon.com/512/1214/1214428.png"
                alt="Delete"
                width={20}
                height={20}
              />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
