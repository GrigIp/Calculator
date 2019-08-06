import React from 'react';
import logo from './logo.svg';
import './App.css';
import Button from './button';
import Display from './display';
import { BUTTON_PROPERTIES_ARRAY } from './constants';
import { updateResult } from './pressButtonLogic';

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
        this.updateState = this.updateState.bind(this);
    }

    updateState(value) {
        this.setState({ ...updateResult(value, this.state) });
    }

    getButtonProperties(properties, index) {
        let newProperties = { ...BUTTON_PROPERTIES_ARRAY[index] };
        if (index === 0) {
            if (
                this.state.default === false ||
                this.state.operators.array.length > 0
            ) {
                newProperties.value = 'C';
            } else {
                newProperties.value = 'AC';
            }
        }

        return newProperties;
    }

    render() {
        return (
            <>
                <Display
                    value={this.state.result[this.state.result.length - 1]}
                />
                <div
                    className="buttons-area"
                    style={{ width: '240px', height: '250px' }}
                >
                    {BUTTON_PROPERTIES_ARRAY.map((properties, index) => {
                        let buttonProperties = this.getButtonProperties(
                            properties,
                            index
                        );
                        return (
                            <Button
                                key={buttonProperties.value}
                                value={buttonProperties.value}
                                properties={buttonProperties}
                                updateState={this.updateState}
                            />
                        );
                    })}
                </div>
            </>
        );
    }
}
export default App;
