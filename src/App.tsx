import React, { Component, useState, useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import { observer } from "mobx-react";
import { observable, decorate } from "mobx";
import { Store } from "./store";

const store = new Store();

const MobXCounter = observer(() => {
  return (
    <>
      <h1>Counter (MobX store): {store.count}</h1>
      <button onClick={() => store.count++}>Count up</button>
      <hr />
    </>
  );
});

function StateCounter() {
  // Hooks demo
  const [counter, setCounter] = useState(0);

  return (
    <>
      <h1>Counter (state hook): {counter}</h1>
      <button onClick={() => setCounter(counter + 1)}>Count up</button>
      <hr />
    </>
  );
}

function App() {
  useEffect(() => alert("Mounting App..."), []);

  return (
    <div className="App">
      <MobXCounter />
      <StateCounter />
      <header className="App-header">
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
      </header>
    </div>
  );
}

export default App;
