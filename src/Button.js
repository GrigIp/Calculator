import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import './calculatorStyle.css';

class Button extends React.Component {
    render() {
        const { value, color = 'light-gray', width = 'narrow', updateState } = {
            ...this.props,
        };
        const classes = classNames({
            'button-style': true,
            'light-gray': color === 'light-gray',
            'dark-gray': color === 'dark-gray',
            orange: color === 'orange',
            narrow: width === 'narrow',
            wide: width === 'wide',
        });

        return (
            <button className={classes} onClick={() => updateState(value)}>
                {value}
            </button>
        );
    }
}

Button.propTypes = {
    value: PropTypes.oneOf([
        'AC',
        'C',
        '+/-',
        '%',
        '÷',
        '7',
        '8',
        '9',
        'x',
        '4',
        '5',
        '6',
        '-',
        '1',
        '2',
        '3',
        '+',
        '0',
        '.',
        '=',
    ]).isRequired,
    color: PropTypes.oneOf(['dark-gray', 'orange', 'light-gray']),
    width: PropTypes.oneOf(['narrow', 'wide']),
    updateState: PropTypes.func.isRequired,
};

export default Button;
