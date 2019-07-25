import React from 'react';
import './Style.css';
import {COLORS} from './constants';

let colors = COLORS;
class Button extends React.Component {
  specialKeys = () =>{
    switch(this.props.value){
      case 'C':
        this.props.updateResult('0',true);
        break;
      default:
        console.log('this is a special key', this.props.value);
    }
  };

  updateResult = () => {
    if (this.props.isDisplayable)
      this.props.updateResult(this.props.value, false);
    else this.specialKeys();
  };
  render() {
    return (
      <button
        className='button'
        style={{
          backgroundColor: colors[this.props.index],
          width: this.props.value === '0' ? '120px' : '60px'
        }}
        onClick={this.updateResult}
      >
        {this.props.value}
      </button>
    );
  }
}

export default Button;
