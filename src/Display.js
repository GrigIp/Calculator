import React from 'react';
import { Textfit } from 'react-textfit';

const displayStyle = {
    width: '240px',
    height: '100px',
    backgroundColor: '#1c1c1c',
    color: 'white',
    fontSize: '50px',
    textAlign: 'right',
    lineHeight: '110px',
};

const Display = props => (
    <Textfit
        mode="single"
        className="display"
        style={displayStyle}
        forceSingleModeWidth={true}
        max={80}
    >
        {props.value}
    </Textfit>
);

export default Display;
