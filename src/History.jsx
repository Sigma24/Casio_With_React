const HISTORY_KEY = 'calculator_history';
const MAX_HISTORY_ITEMS = 15;

const HistoryManager = {
  addHistory: (expressionWithResult) => {
    let history = JSON.parse(localStorage.getItem(HISTORY_KEY)) || [];

    // Add new item to top
    history.unshift({
      expressionWithResult,
      date: getCurrentDate(),
      time: getCurrentTime(),
    });

    // Limit to 15 items
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
  return new Date().toLocaleDateString('en-GB'); // DD/MM/YYYY
}

function getCurrentTime() {
  return new Date().toLocaleTimeString('en-GB', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  }); // HH:mm
}

export default HistoryManager;



