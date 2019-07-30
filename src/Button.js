import React from 'react';
import './Style.css';
import { COLORS } from './constants';
import { updateResult } from './PressButtonLogic';

let colors = COLORS;
class Button extends React.Component {
    updateState = () => {
        this.props.updateState(
            updateResult(
                this.props.value,
                this.props.currentState,
                this.props.isDisplayable
            )
        );
    };
    render() {
        return (
            <button
                className="button"
                style={{
                    backgroundColor: colors[this.props.index],
                    width: this.props.value === '0' ? '120px' : '60px',
                }}
                onClick={this.updateState}
            >
                {this.props.value}
            </button>
        );
    }
}

export default Button;
