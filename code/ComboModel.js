class ComboModel {
    get color() {
        return this._color;
    }

    set color(color) {
        const classList = this.tile.classList;

        classList.remove("color-" + this._color);
        const oldGroup = window.colorGroups[this._color];
        if (oldGroup) {
            oldGroup.delete(this);
        }

        classList.add("color-" + color);
        const newGroup = window.colorGroups[color];
        if (newGroup) {
            newGroup.add(this);
        }

        updateGroupCounts();

        this._color = color;
    }

    constructor(myTile) {
        this.tile = myTile;
        this.tile.model = this;
        this.color = colors[0];

        this.tile.addEventListener("mousedown", (event) => {
            if (isPrimaryMouseDown(event)) {
                this.setColor();
            }
        });


        this.tile.addEventListener("mouseenter", (event) => {
            if (isPrimaryMouseDown(event)) {
                this.setColor();
            }
        });
    }

    setColor() {
        this.color = window.selectedColor;
    }
}