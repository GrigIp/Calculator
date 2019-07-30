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
            result: ['0'],
            operators: {
                array: [],
                redundant: 0,
            },
            default: true,
            point: false,
        };
        //this.updateResult = this.updateResult.bind(this);
    }
    valuesArray = VALUES_ARRAY;
    updateState = newState => {
        this.setState({ ...newState });
    };
    isDisplayable(index) {
        //console.log(index);
        if (NUMBERS.indexOf(index) === -1) return false;
        return true;
    }
    render() {
        console.log(this.state.result);
        console.log(this.state.operators);
        return (
            <>
                <Display
                    value={this.state.result}
                    length={this.state.result.length}
                />
                <div className="buttons-area">
                    {this.valuesArray.map((value, index) => (
                        <Button
                            key={value}
                            isDisplayable={this.isDisplayable(index)}
                            index={index++}
                            value={
                                value === 'AC' &&
                                (this.state.default === false ||
                                    this.state.operators.array.length > 0)
                                    ? 'C'
                                    : value
                            }
                            updateState={this.updateState}
                            currentState={this.state}
                        />
                    ))}
                </div>
            </>
        );
    }
}

export default App;
