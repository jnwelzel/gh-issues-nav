import React, { useState } from "react";
import { useDispatch } from "react-redux";
import "./App.css";
import { setRepository } from "./features/repository/repositorySlice";
import Template from "./Template";

function App() {
  const dispatch = useDispatch();
  const [inputValue, setInputValue] = useState("facebook/react");

  const onSubmitHandler = (e) => {
    e.preventDefault();
    if (inputValue.trim()) {
      dispatch(setRepository(inputValue));
    }
  };

  const onChangeHandler = (e) => {
    setInputValue(e.target.value);
  };

  return (
    <Template>
      <div className="App">
        <header>
          <h1>Choose a repo</h1>
        </header>
        <main>
          <form onSubmit={onSubmitHandler}>
            <input
              type="search"
              name="user"
              placeholder="facebook/react"
              value={inputValue}
              onChange={onChangeHandler}
            />
            <button type="submit">Ok</button>
          </form>
        </main>
      </div>
    </Template>
  );
}

export default App;
