import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import './calculatorStyle.css';

class Button extends React.Component {
    render() {
        const {
            value = 'Button',
            color = 'light gray',
            width = 'narrow',
            updateState,
        } = {
            ...this.props,
        };
        const classes = classNames({
            'button-style': true,
            lg: color === 'light gray',
            dg: color === 'dark gray',
            og: color === 'orange',
            nrw: width === 'narrow',
            wd: width === 'wide',
        });

        return (
            <button className={classes} onClick={() => updateState(value)}>
                {value}
            </button>
        );
    }
}

Button.propTypes = {
    value: PropTypes.string.isRequired,
    color: PropTypes.oneOf(['dark gray', 'orange']),
    width: PropTypes.string,
    updateState: PropTypes.func.isRequired,
};

export default Button;
