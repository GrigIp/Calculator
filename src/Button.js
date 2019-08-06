import React from 'react';
import Radium from 'radium';

const properties = {
    backgroundColor: '#D4D4D2',
    height: '50px',
    width: '60px',
    borderStyle: 'solid',
    borderColor: 'black',
    fontSize: '20px',
    ':focus': {
        outline: 'none',
    },
};

class Button extends React.Component {
    value = 'Button';
    onClick;

    setProperties(properties) {
        const newProperties = { ...properties };

        newProperties.backgroundColor =
            this.props.properties.colors === undefined
                ? '#D4D4D2'
                : this.props.properties.colors;

        newProperties.width =
            this.props.properties.width === undefined
                ? '60px'
                : this.props.properties.width;

        this.value = this.props.properties.value;
        this.onClick = this.props.updateState;

        return newProperties;
    }

    render() {
        return (
            <button
                className="button"
                style={this.setProperties(properties)}
                onClick={() => this.onClick(this.value)}
            >
                {this.value}
            </button>
        );
    }
}

const StyledButton = Radium(Button);

export default StyledButton;
