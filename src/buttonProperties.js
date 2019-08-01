export class ButtonProperties {
    constructor(properties) {
        this.value = properties.value;
        this.colors =
            properties.colors === undefined ? '#D4D4D2' : properties.colors;
        this.isDisplayable =
            properties.isDisplayable === undefined
                ? true
                : properties.isDisplayable;
        this.width = properties.width === undefined ? '60px' : properties.width;
    }
    setValue(newValue) {
        this.value = newValue;
    }
    getValue() {
        return this.value;
    }
}
