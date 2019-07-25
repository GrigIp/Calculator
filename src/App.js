import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import Button from './Button';
import Display from './Display';
import { VALUES_ARRAY, NUMBERS } from './constants';
import './Style.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      result: '0',
      default: true
    };
    //this.updateResult = this.updateResult.bind(this);
  }
  valuesArray = VALUES_ARRAY;
  updateResult = (value, defaultValue) => {
    if (defaultValue === true) {
      this.setState({ result: '0', default: defaultValue });
    }
    else
      if (this.state.default !== true)
        this.setState({
          result: this.state.result.concat(value),
          default: defaultValue
        });
        else {
          this.setState({ result: value, default: defaultValue });
        }
  };
  isDisplayable(index) {
    if (NUMBERS.indexOf(index) === -1) return false;
    return true;
  }
  render() {
    return (
      <>
        <Display value={this.state.result} />
        <div className='buttons-area'>
          {this.valuesArray.map((value,index) => (
            <Button
              key={value}
              isDisplayable={this.isDisplayable(index)}
              index={index++}
              value={
                value === 'AC' && this.state.default === false ? 'C' : value
              }
              updateResult={this.updateResult}
            />
          ))}
        </div>
      </>
    );
  }
}

export default App;
