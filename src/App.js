import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import Calculator from './Calculator';
import ShowHistory from './ShowHistory';

function HomeScreen() {
  const navigate = useNavigate();

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <button className='hell' onClick={() => navigate('/calculator')}>Click Karo</button>
      </header>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomeScreen />} />
        <Route path="/calculator" element={<Calculator />} />
        <Route path="/history" element={<ShowHistory />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
