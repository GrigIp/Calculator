import React from 'react';
import './Style.css';
import { Textfit } from 'react-textfit';

const Display = props => (
  <Textfit mode='single' className='display'>
    {props.value}
  </Textfit>
);

export default Display;
