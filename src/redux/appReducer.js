import * as actions from './actionTypes';
import { processPressButton } from '../pressButtonLogic';

export const appReducer = (
    state = {
        result: ['0'],
        operators: [],
        redundant: 0,
    },
    action
) => {
    const { type, value } = { ...action };

    switch (type) {
        case actions.PRESS_BUTTON:
            return processPressButton(value, state);
        default:
            return state;
    }
};
