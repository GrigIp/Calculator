import React from "react";
import "./Style.css";
import constant from "./constants";

let colors = constant.colors;
const Button = props => (
  <button
    className="Button"
    style={{
      width: props.value === "0" ? "120px" : "60px",
      backgroundColor: colors[props.index]
    }}
  >
    {props.value}
  </button>
);

export default Button;
