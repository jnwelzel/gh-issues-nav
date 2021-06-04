import React from "react";
import "./App.css";
import Template from "./Template";

function App() {
  return (
    <Template>
      <div className="App">
        <header>
          <h1>1. Choose a Github user</h1>
        </header>
        <main>
          <form>
            <input type="search" name="user" placeholder="facebook" />
            <button type="submit">Ok</button>
          </form>
        </main>
      </div>
    </Template>
  );
}

export default App;
