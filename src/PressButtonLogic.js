const canConcat = (value, state) => {
    if (state.result.length === state.operators.length) {
        return false;
    }

    return true;
};

const trimZero = state => {
    const lastElemIndex = state.result.length - 1;
    if (
        state.result[lastElemIndex].startsWith('0') &&
        !state.result[lastElemIndex].startsWith('0.')
    ) {
        state.result[lastElemIndex] = state.result[lastElemIndex].slice(-1);
    }

    return state;
};

const handleArrays = (value, state) => {
    let newState = JSON.parse(JSON.stringify(state));
    newState.operators.push(value);

    let difference = newState.operators.length - newState.result.length;
    if (difference > 0) {
        newState.operators.splice(0, difference);
    }

    return newState;
};

const calculatePartialResult = (firstOperand, secondOperand, operator) => {
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
    if (
        state.operators.length === state.result.length &&
        state.operators.length > 1
    ) {
        state.operators.splice(0, 1);
    }

    for (let i = 0; i < state.operators.length - 1; i++) {
        let val = state.operators[i];
        if (val === 'x' || val === '÷') {
            let result = state.result[i];
            state.operators.splice(i, 1);
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
    let newState = JSON.parse(JSON.stringify(state));
    newState = solveOrderOfPrecedence(newState);

    const lastElemResultArray = newState.result.length - 1;
    let lastElemOperatorsArray = newState.operators.length - 1;
    let finalResult = Number(newState.result[0]);

    if (lastElemResultArray + 1 > 1) {
        if (newState.operators.length === lastElemResultArray + 1) {
            newState.operators.splice(0, 1);
            lastElemOperatorsArray = newState.operators.length - 1;
        }

        for (let i = 0; i <= lastElemOperatorsArray; i++) {
            finalResult = calculatePartialResult(
                finalResult,
                Number(newState.result[i + 1]),
                newState.operators[i]
            );
        }

        newState.operators = [newState.operators[lastElemOperatorsArray]];
        newState.redundant = Number(newState.result[lastElemResultArray]);
    } else {
        finalResult = Number(newState.result[0]);
        finalResult = calculatePartialResult(
            finalResult,
            newState.redundant,
            newState.operators[lastElemOperatorsArray]
        );
    }

    newState.result = [finalResult.toString()];

    return newState;
};

export const createNewDisplayingState = (newResult, state) => {
    let newState = JSON.parse(JSON.stringify(state));
    let nowDisplaying = newState.result[newState.result.length - 1];

    if (nowDisplaying.includes('.') && newResult === '.') {
        return newState;
    }

    const saveResultArray = newState.result;
    const lastElem = saveResultArray.length - 1;

    if (canConcat(newResult, newState)) {
        saveResultArray[lastElem] = saveResultArray[lastElem].concat(newResult);
        newState.result = saveResultArray;

        newState = trimZero(newState);

        return newState;
    } else {
        saveResultArray.push(newResult);
        newState.result = saveResultArray;

        return newState;
    }
};

const constMultiplyer = (multiplyer, state) => {
    let newState = JSON.parse(JSON.stringify(state));
    let lastElem = newState.result.length - 1;
    let stateResult = Number(newState.result[lastElem]);

    stateResult *= multiplyer;
    newState.result[lastElem] = stateResult.toString();

    return newState;
};

export const specialKeys = (value, state) => {
    switch (value) {
        case 'C':
            return {
                result: ['0'],
                operators: [],
                redundant: 0,
            };
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
export const isDisplayable = value => {
    return (
        value === '1' ||
        value === '2' ||
        value === '3' ||
        value === '4' ||
        value === '5' ||
        value === '6' ||
        value === '7' ||
        value === '8' ||
        value === '9' ||
        value === '0' ||
        value === '.'
    );
};
