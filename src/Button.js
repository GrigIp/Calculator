import React from 'react';
import './style.css';

class Button extends React.Component {
    render() {
        return (
            <button
                className="button"
                style={{
                    backgroundColor: this.props.properties.colors,
                    width: this.props.properties.width,
                }}
                onClick={e =>
                    this.props.updateState(
                        this.props.properties.value,
                        this.props.properties.isDisplayable
                    )
                }
            >
                {this.props.properties.value}
            </button>
        );
    }
}

export default Button;
