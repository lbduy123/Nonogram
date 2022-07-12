class Cell {
    constructor(value, color) {
        if (color === undefined) {
            this.color = 'black'
        } else {
            this.color = color;
        }
        this.value = value;
    }
}

module.exports = Cell