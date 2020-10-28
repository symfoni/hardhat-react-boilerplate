import React from 'react';
import logo from './logo.svg';
import './App.css';
import { HardhatContext } from "./hardhat/HardhatContext";
import { Greeter } from './components/Greeter';

function App() {

  return (
    <div className="App">
      <header className="App-header">
        <HardhatContext>
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.tsx</code> and save to reload.
        </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
        </a>
          <Greeter></Greeter>
        </HardhatContext>
      </header>
    </div>
  );
}

export default App;
