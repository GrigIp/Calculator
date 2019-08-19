import * as buttonActions from '../pressButtonLogic';
import * as types from './actionTypes';

export default function appReducer(
    state = {
        result: ['0'],
        operators: {
            array: [],
            redundant: 0,
        },
        default: true,
        point: false,
    },
    action
) {
    //let newState = JSON.parse(JSON.stringify(state));
    //console.log(JSON.stringify(state));
    switch (action.type) {
        case types.DISPLAY_NUMBER:
            return buttonActions.createNewDisplayingState(action.value, state);
        case types.ADD_OPERATION_OR_DISPLAY_RESULT:
            return buttonActions.specialKeys(action.value, state);
        default:
            return state;
    }
}
