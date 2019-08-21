import * as buttonLogic from '../pressButtonLogic';
import * as actions from './actionTypes';
export default function appReducer(
    state = {
        result: ['0'],
        operators: [],
        redundant: 0,
    },
    action
) {
    const { type, value, displayable } = { ...action };
    switch (type) {
        case actions.PRESS_BUTTON:
            if (displayable) {
                return buttonLogic.createNewDisplayingState(value, state);
            } else {
                return buttonLogic.specialKeys(value, state);
            }
            break;
        default:
            return state;
    }
}
