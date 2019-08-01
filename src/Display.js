import React from 'react';
import './style.css';
import { Textfit } from 'react-textfit';

const Display = props => (
    <Textfit
        mode="single"
        className="display"
        forceSingleModeWidth={true}
        max={80}
    >
        {props.value}
    </Textfit>
);

export default Display;
