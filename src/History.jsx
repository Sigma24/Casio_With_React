
import "./shift.css";

const HISTORY_KEY = 'calculator_history';
const MAX_HISTORY_ITEMS = 15;

const HistoryManager = {
  addHistory: (expressionWithResult) => {
    let history = JSON.parse(localStorage.getItem(HISTORY_KEY)) || [];

 
    history.unshift({
      expressionWithResult,
      date: getCurrentDate(),
      time: getCurrentTime(),
    });


    if (history.length > MAX_HISTORY_ITEMS) {
      history = history.slice(0, MAX_HISTORY_ITEMS);
    }

    localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
  },

  getAllHistory: () => {
    return JSON.parse(localStorage.getItem(HISTORY_KEY)) || [];
  },

  deleteHistoryItem: (index) => {
    let history = JSON.parse(localStorage.getItem(HISTORY_KEY)) || [];
    history.splice(index, 1);
    localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
  },

  clearAllHistory: () => {
    localStorage.removeItem(HISTORY_KEY);
  },
};

function getCurrentDate() {
  return new Date().toLocaleDateString('en-GB'); 
}

function getCurrentTime() {
  return new Date().toLocaleTimeString('en-GB', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  }); // HH:mm
}




export default HistoryManager;



// import React, { useEffect, useState } from "react";
// import HistoryManager from "./HistoryManager"; // assuming it's in a separate file

// const HistoryView = ({ showHistory }) => {
//   const [historyItems, setHistoryItems] = useState([]);

//   useEffect(() => {
//     if (showHistory) {
//       const stored = HistoryManager.getAllHistory();
//       setHistoryItems(stored);
//     }
//   }, [showHistory]);

  

//   return (
//     <>
//       {showHistory && (
//         <div className="history-view">
//           <h3>History</h3>
//           <ul>
//             {historyItems.map((item, index) => (
//               <li key={index}>
//                 <strong>{item.expressionWithResult}</strong>
//                 <br />
//                 <small>{item.date} {item.time}</small>
//               </li>
//             ))}
//           </ul>
//         </div>
//       )}
//     </>
//   );
// };

// export default HistoryView;
