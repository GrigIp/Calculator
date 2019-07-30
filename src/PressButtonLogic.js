const canConcat = (value, state) => {
    if (state.result[state.result.length - 1] === '0' && value !== '.')
        return false;
    return state.default !== true || (state.state === true && value === '.');
};

const handleArrays = (value, state) => {
    const saveResultArray = state.result;
    saveResultArray.push(saveResultArray[saveResultArray.length - 1]);
    state.result = saveResultArray;
    state.operators.array.push(value);
    state.default = true;
    return state;
};
const calculatePartialResult = (firstOperand, secondOperand, operator) => {
    //console.log('secondOperand', secondOperand, operator);
    switch (operator) {
        case '+':
            firstOperand += secondOperand;
            return firstOperand;
        case '-':
            firstOperand -= secondOperand;
            return firstOperand;
        case 'x':
            firstOperand *= secondOperand;
            return firstOperand;
        case '÷':
            firstOperand /= secondOperand;
            return firstOperand;
        default:
            return firstOperand;
    }
};

const solveOrderOfPrecedence = state => {
    //let newState = state;
    if (
        state.operators.array.length === state.result.length &&
        state.operators.array.length > 1
    ) {
        state.operators.array.splice(0, 1);
    }
    for (let i = 0; i < state.operators.array.length - 1; i++) {
        let val = state.operators.array[i];
        if (val === 'x' || val === '÷') {
            let result = state.result[i];
            state.operators.array.splice(i, 1);
            if (val === 'x') {
                state.result[i + 1] *= result;
            } else {
                state.result[i + 1] = result / state.result[i + 1];
            }

            state.result.splice(i, 1);
        }
    }
    return state;
};

const calculateResult = state => {
    state = solveOrderOfPrecedence(state);
    const lastElemResultArray = state.result.length - 1;
    let lastElemOperatorsArray = state.operators.array.length - 1;
    let finalResult = Number(state.result[0]);
    if (lastElemResultArray + 1 > 1) {
        if (state.operators.array.length === lastElemResultArray + 1) {
            state.operators.array.splice(0, 1);
            lastElemOperatorsArray = state.operators.array.length - 1;
        }
        for (let i = 0; i <= lastElemOperatorsArray; i++) {
            finalResult = calculatePartialResult(
                finalResult,
                Number(state.result[i + 1]),
                state.operators.array[i]
            );
        }
        state.operators.array = [state.operators.array[lastElemOperatorsArray]];
        state.operators.redundant = Number(state.result[lastElemResultArray]);
    } else {
        finalResult = Number(state.result[0]);
        finalResult = calculatePartialResult(
            finalResult,
            state.operators.redundant,
            state.operators.array[lastElemOperatorsArray]
        );
    }
    state.default = true;
    state.result = [finalResult.toString()];
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
            operators: {
                array: [],
                redundant: 0,
            },
            default: newDefaultValue,
            point: false,
        };
    } else if (canConcat(newResult, state)) {
        saveResultArray[lastElem] = saveResultArray[lastElem].concat(newResult);
        return {
            result: saveResultArray,
            default: newDefaultValue,
            point: state.point,
        };
    } else {
        saveResultArray[lastElem] = newResult;
        state.point = false;
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
            return calculateResult(state);
        default:
            return handleArrays(value, state);
    }
};

export const updateResult = (value, state, isDisplayable) => {
    if (isDisplayable) return createNewDisplayingState(value, false, state);

    return specialKeys(value, state);
};
