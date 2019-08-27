import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import React from 'react';

import './calculatorStyle.css';
import Button from './button';
import { BUTTON_PROPERTIES_ARRAY } from './constants';
import Display from './display';
import { pressButton } from './redux/actions';

class App extends React.Component {
    handleUpdateState(value) {
        this.props.pressButton(value);
    }

    getButtonStyle(properties, index) {
        const { defaultValue, operators } = { ...this.props };
        let newProperties = { ...BUTTON_PROPERTIES_ARRAY[index] };

        if (index !== 0) {
            return newProperties;
        }
        if (defaultValue === false || operators.length > 0) {
            newProperties.value = 'C';
        } else {
            newProperties.value = 'AC';
        }

        return newProperties;
    }

    render() {
        const { result } = { ...this.props };
        const displayingValue = result[result.length - 1];

        return (
            <>
                <Display value={displayingValue} />
                <div className="buttons-area">
                    {BUTTON_PROPERTIES_ARRAY.map((properties, index) => {
                        let buttonProperties = this.getButtonStyle(
                            properties,
                            index
                        );

                        return (
                            <Button
                                key={buttonProperties.value}
                                value={buttonProperties.value}
                                color={buttonProperties.color}
                                width={buttonProperties.width}
                                updateState={(...params) =>
                                    this.handleUpdateState(...params)
                                }
                            />
                        );
                    })}
                </div>
            </>
        );
    }
}

App.propTypes = {
    result: PropTypes.array.isRequired,
    operators: PropTypes.array.isRequired,
    redundant: PropTypes.number.isRequired,
    pressButton: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
    return {
        result: state.result,
        operators: state.operators,
        redundant: state.redundant,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        pressButton: bindActionCreators(pressButton, dispatch),
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App);
