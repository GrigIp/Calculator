const canConcat = (value, defaultState) => {
    return defaultState !== true || (defaultState === true && value === '.');
};

const handleArrays = (value, state) => {
    const saveResultArray = state.result;
    saveResultArray.push(saveResultArray[saveResultArray.length - 1]);
    state.result = saveResultArray;
    state.operators.push(value);
    state.default = true;
    return state;
};

const createNewDisplayingState = (newResult, newDefaultValue, state) => {
    if (newResult === '.' && state.point) {
        return state;
    }
    if (newResult === '.') state.point = true;
    const saveResultArray = state.result;
    const lastElem = saveResultArray.length - 1;
    if (newDefaultValue === true) {
        return {
            result: ['0'],
            default: newDefaultValue,
            point: false,
        };
    } else if (canConcat(newResult, state.default)) {
        saveResultArray[lastElem] = saveResultArray[lastElem].concat(newResult);
        return {
            result: saveResultArray,
            default: newDefaultValue,
            point: state.point,
        };
    } else {
        saveResultArray[lastElem] = newResult;
        return {
            result: saveResultArray,
            default: newDefaultValue,
            point: state.point,
        };
    }
};

const constMultiplyer = (multiplyer, state) => {
    let lastElem = state.result.length - 1;
    let stateResult = Number(state.result[lastElem]);
    stateResult *= multiplyer;
    state.result[lastElem] = stateResult.toString();
    return {
        result: state.result,
        default: state.default,
        point: state.point,
    };
};
const specialKeys = (value, state) => {
    switch (value) {
        case 'C':
            return createNewDisplayingState('0', true, state);
        case '+/-':
            return constMultiplyer(-1, state);
        case '%':
            return constMultiplyer(0.01, state);
        case 'AC':
            return state;
        case '=':
            return state;
        default:
            return handleArrays(value, state);
    }
};

export const updateResult = (value, state, isDisplayable) => {
    if (isDisplayable) return createNewDisplayingState(value, false, state);
    return specialKeys(value, state);
};
