import React from "react";
import logo from "./logo.svg";
import "./App.css";
import Button from "./Button.js";
import Display from "./Display.js";
import constant from "./constants";
import "./Style.css";

const App = () => {
  let index = 0;
  let arr = constant.arr;
  return (
    <>
      <Display />
      <div className="ButtonsArea">
        {arr.map(value => (
          <Button key={value} index={index++} value={value} />
        ))}
      </div>
    </>
  );
};

export default App;
