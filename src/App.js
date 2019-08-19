import React from 'react';
import { connect } from 'react-redux';
import * as appActions from './redux/actions';
import logo from './logo.svg';
import './App.css';
import Button from './button';
import Display from './display';
import { BUTTON_PROPERTIES_ARRAY } from './constants';
import './calculatorStyle.css';
import { Provider } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.handleUpdateState = this.handleUpdateState.bind(this);
    }

    handleUpdateState(value) {
        this.props.actions.getType(value);
    }

    getButtonStyle(properties, index) {
        let newProperties = { ...BUTTON_PROPERTIES_ARRAY[index] };
        if (index === 0) {
            if (
                this.props.state.default === false ||
                this.props.state.operators.array.length > 0
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
                    value={
                        this.props.state.result[
                            this.props.state.result.length - 1
                        ]
                    }
                />
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
                                updateState={this.handleUpdateState}
                            />
                        );
                    })}
                </div>
            </>
        );
    }
}

App.propTypes = {
    state: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
    return {
        state,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(appActions, dispatch),
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App);
