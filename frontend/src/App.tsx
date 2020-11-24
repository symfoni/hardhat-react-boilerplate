import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Hardhat } from "./hardhat/HardhatContext";
import { Greeter } from './components/Greeter';

function App() {

  return (
    <div className="App">
      <header className="App-header">
        <Hardhat autoInit={true} showLoading={true}>
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
        </Hardhat>
      </header>
    </div>
  );
}

export default App;
