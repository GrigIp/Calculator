import React from 'react';
import { Textfit } from 'react-textfit';

const Display = props => (
    <Textfit
        className="display"
        mode="single"
        forceSingleModeWidth={true}
        max={80}
    >
        {props.value}
    </Textfit>
);

export default Display;
