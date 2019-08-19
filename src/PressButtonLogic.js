const canConcat = (value, state) => {
    if (state.result[state.result.length - 1] === '0' && value !== '.') {
        return false;
    }

    return state.default !== true || (state.defaut === true && value === '.');
};

const handleArrays = (value, state) => {
    let newState = JSON.parse(JSON.stringify(state));
    const saveResultArray = newState.result;
    saveResultArray.push(saveResultArray[saveResultArray.length - 1]);
    newState.result = saveResultArray;
    newState.operators.array.push(value);
    newState.default = true;

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
    let newState = JSON.parse(JSON.stringify(state));
    newState = solveOrderOfPrecedence(newState);

    const lastElemResultArray = newState.result.length - 1;
    let lastElemOperatorsArray = newState.operators.array.length - 1;
    let finalResult = Number(newState.result[0]);

    if (lastElemResultArray + 1 > 1) {
        if (newState.operators.array.length === lastElemResultArray + 1) {
            newState.operators.array.splice(0, 1);
            lastElemOperatorsArray = newState.operators.array.length - 1;
        }

        for (let i = 0; i <= lastElemOperatorsArray; i++) {
            finalResult = calculatePartialResult(
                finalResult,
                Number(newState.result[i + 1]),
                newState.operators.array[i]
            );
        }

        newState.operators.array = [
            newState.operators.array[lastElemOperatorsArray],
        ];
        newState.operators.redundant = Number(
            newState.result[lastElemResultArray]
        );
    } else {
        finalResult = Number(newState.result[0]);
        finalResult = calculatePartialResult(
            finalResult,
            newState.operators.redundant,
            newState.operators.array[lastElemOperatorsArray]
        );
    }

    newState.default = true;
    newState.result = [finalResult.toString()];

    return newState;
};

export const createNewDisplayingState = (newResult, state) => {
    let newState = JSON.parse(JSON.stringify(state));
    //console.log(JSON.stringify(newState));
    if (newResult === '.' && newState.point) {
        //console.log('Iese pe primul if');
        return newState;
    }
    if (newResult === '.') {
        newState.point = true;
    }

    const saveResultArray = newState.result;
    const lastElem = saveResultArray.length - 1;

    if (canConcat(newResult, newState)) {
        //console.log('Iese pe canConcat');
        saveResultArray[lastElem] = saveResultArray[lastElem].concat(newResult);
        newState.result = saveResultArray;

        return newState;
    } else {
        //console.log('Iese pe else-ul de la canConcat');
        saveResultArray[lastElem] = newResult;
        newState.result = saveResultArray;
        newState.point = false;
        newState.default = false;

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
                operators: {
                    array: [],
                    redundant: 0,
                },
                default: true,
                point: false,
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
