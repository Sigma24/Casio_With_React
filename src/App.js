import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import Calculator from './Calculator';

function App() {
  const[screen,setscreen]=useState(false)
  if(screen){
    return <Calculator/>
  }
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
        <button className='hell' onClick={()=>setscreen(true)}>Click Karo </button>
        
      </header>
    </div>
  );
}

export default App;
