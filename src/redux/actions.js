import * as types from './actionTypes';
import { isDisplayable } from '../pressButtonLogic';

export function getType(value) {
    if (isDisplayable(value))
        return { type: types.DISPLAY_NUMBER, value: value };

    return { type: types.ADD_OPERATION_OR_DISPLAY_RESULT, value: value };
}
