import * as types from './actionTypes';
import { isDisplayable } from '../pressButtonLogic';

export default function pressButton(value) {
    return {
        type: types.PRESS_BUTTON,
        value: value,
        displayable: isDisplayable(value),
    };
}
