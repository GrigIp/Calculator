import { ButtonProperties } from './buttonProperties';

export const BUTTON_PROPERTIES_ARRAY = [
    new ButtonProperties({
        value: 'AC',
        colors: '#505050',
        isDisplayable: false,
    }),

    new ButtonProperties({
        value: '+/-',
        colors: '#505050',
        isDisplayable: false,
    }),

    new ButtonProperties({
        value: '%',
        colors: '#505050',
        isDisplayable: false,
    }),

    new ButtonProperties({
        value: '÷',
        colors: '#FF9500',
        isDisplayable: false,
    }),

    new ButtonProperties({ value: '7' }),
    new ButtonProperties({ value: '8' }),
    new ButtonProperties({ value: '9' }),

    new ButtonProperties({
        value: 'x',
        colors: '#FF9500',
        isDisplayable: false,
    }),

    new ButtonProperties({ value: '4' }),
    new ButtonProperties({ value: '5' }),
    new ButtonProperties({ value: '6' }),

    new ButtonProperties({
        value: '-',
        colors: '#FF9500',
        isDisplayable: false,
    }),

    new ButtonProperties({ value: '1' }),
    new ButtonProperties({ value: '2' }),
    new ButtonProperties({ value: '3' }),

    new ButtonProperties({
        value: '+',
        colors: '#FF9500',
        isDisplayable: false,
    }),

    new ButtonProperties({ value: '0', width: '120px' }),
    new ButtonProperties({ value: '.' }),

    new ButtonProperties({
        value: '=',
        colors: '#FF9500',
        isDisplayable: false,
    }),
];
