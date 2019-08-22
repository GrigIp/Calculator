import * as types from './actionTypes';

export const pressButton = value => {
    return {
        type: types.PRESS_BUTTON,
        value,
    };
};
