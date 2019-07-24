import React from "react";
import logo from "./logo.svg";
import "./App.css";
import Number from "./Number.js";
import Display from "./Display.js";
import constant from "./constants";
import "./Style.css";

const App = () => {
  let index = 0;
  let arr = constant.arr;
  return (
    <>
      <Display />
      <div className="bla">
        {arr.map(value => (
          <Number key={value} index={index++} value={value} />
        ))}
      </div>
      <button>Button test</button>
    </>
  );
};

export default App;
