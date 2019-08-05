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
    setStyle(properties) {
        const newProperties = { ...properties };
        newProperties.backgroundColor =
            this.props.properties.colors === undefined
                ? '#D4D4D2'
                : this.props.properties.colors;
        newProperties.width =
            this.props.properties.width === undefined
                ? '60px'
                : this.props.properties.width;

        return newProperties;
    }

    render() {
        return (
            <button
                className="button"
                style={this.setStyle(properties)}
                onClick={() =>
                    this.props.updateState(this.props.properties.value)
                }
            >
                {this.props.properties.value}
            </button>
        );
    }
}
const StyledButton = Radium(Button);
export default StyledButton;
