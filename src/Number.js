import React from "react";

const Number = props => (
  <button className="buttons" onClick={() => props.number}>
    {props.number}
  </button>
);

export default Number;
